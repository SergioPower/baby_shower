import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";


export const RsvpForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		guests: 0,
		message: ""

	});
	const [sent, setSent] = useState(false);

	const fire = () => {

		confetti({
			particleCount: 120,
			spread: 90,
			origin: { y: 0.6 },
			colors: ["#9ec9ee", "#bfe0ff", "#ffffff", "#ffe9a8", "#f7c9d4"],
			scalar: 1.1,
		});
		setTimeout(() => {
			confetti({
				particleCount: 80,
				angle: 60,
				spread: 70,
				origin: { x: 0 },
				colors: ["#9ec9ee", "#ffffff", "#ffe9a8"],
			});
			confetti({
				particleCount: 80,
				angle: 120,
				spread: 70,
				origin: { x: 1 },
				colors: ["#9ec9ee", "#ffffff", "#ffe9a8"],
			});
		}, 250);
	};


	// Verificar si ya confirmo el invitado
	useEffect(() => {
		const confirmed = localStorage.getItem("babyShowerConfirmed");
		const savedName = localStorage.getItem("babyShowerName");

		if (confirmed === "true") {
			setSent(true);

			if (savedName) {
				setFormData((prev) => ({
					...prev,
					name: savedName,
				}));
			}
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();


		if (!formData.name.trim()) {
			toast.error("Por favor escribe tu nombre 🐻");
			return;
		}
		if (!formData.message.trim()) {
			toast.error("Por favor escribe un mensaje para Oliver 💌");
			return;
		}

		const formattedName = formData.name.trim();

		try {
			const { data: existente, error: searchError } = await supabase
				.from("rsvp")
				.select("nombre")
				.ilike("nombre", formattedName);

			if (searchError) throw searchError;

			if (existente.length > 0) {
				toast.error("Ya has confirmado tu asistencia.");
				return;
			}

			const { error } = await supabase
				.from("rsvp")
				.insert([
					{
						nombre: formattedName,
						acompaniantes: formData.guests,
						mensaje: formData.message.trim(),
					}
				]);
			if (error) throw error;

			//guardar en localStorage
			localStorage.setItem("babyShowerConfirmed", "true");
			localStorage.setItem("babyShowerName", formattedName);
		} catch (error) {
			console.error("Error al guardar:", error);
		}

		fire();
		setSent(true);
		toast.success("¡Tu confirmación fue enviada! 💙");

	};

	if (sent) {
		return (
			<motion.div
				initial={{ scale: 0.6, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: "spring" }}
				className="text-center py-8"
			>
				<div className="text-6xl mb-4 animate-bob inline-block">🧸</div>
				<h3 className="font-display text-2xl text-primary mb-2">
					¡Gracias, {formData.name.split(" ")[0]}!
				</h3>
				<p className="font-script text-2xl text-foreground/80">
					Oliver Noah te espera con muchos abrazos 💙
				</p>
			</motion.div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div>
				<Label htmlFor="name" className="font-display text-base text-foreground">
					Tu nombre
				</Label>
				<Input
					id="name"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					placeholder="Nombre Completo"
					className="mt-2 rounded-2xl border-2 border-border bg-white/80 h-12 font-body"
				/>
			</div>
			<div>
				<Label htmlFor="guests" className="font-display text-base text-foreground">
					¿Cuántos vienen contigo?
				</Label>
				<select
					name="guests"
					value={formData.guests}
					onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 0 })}
					className="mt-2 rounded-2xl border-2 border-border bg-white/80 h-12 font-body block w-full px-4"
				>
					<option value={0}>Solo yo</option>
					<option value={1}>1 acompañante</option>
					<option value={2}>2 acompañantes</option>
					<option value={3}>3 acompañantes</option>
					<option value={4}>4 acompañantes</option>
					<option value={5}>5 acompañantes</option>
				</select>
			</div>
			<div>
				<Label htmlFor="message" className="font-display text-base text-foreground">
					Mensajito para Oliver 💌
				</Label>
				<Textarea
					id="message"
					value={formData.message}
					onChange={(e) => setFormData({ ...formData, message: e.target.value })}
					placeholder="Bienvenido al mundo, pequeño..."
					className="mt-2 rounded-2xl border-2 border-border bg-white/80 min-h-[100px] font-body"
				/>
			</div>
			<Button
				type="submit"
				variant="storybook"
				size="xl"
				className="w-full"
			>
				Confirmar asistencia 🎈
			</Button>
		</form>
	);
};
