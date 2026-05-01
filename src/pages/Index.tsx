import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { FloatingScene } from "@/components/FloatingScene";
import { Countdown } from "@/components/Countdown";
import { RsvpForm } from "@/components/RsvpForm";
import heroBear from "@/assets/hero-bear.png";
import elephant from "@/assets/elephant.png";
import bunny from "@/assets/bunny.png";
import babyItems from "@/assets/baby-items.png";
import cloud from "@/assets/cloud.png";
import { Calendar, Clock, MapPin } from "lucide-react";
import fondoMP3 from "@/assets/music/fondo.mp3";

// Event date — feel free to customize
const EVENT_DATE = "2026-05-30T14:00:00";


const FadeUp = ({
	children,
	delay = 0,
}: {
	children: React.ReactNode;
	delay?: number;
}) => (
	<motion.div
		initial={{ opacity: 0, y: 30 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, margin: "-80px" }}
		transition={{ duration: 0.7, delay, ease: "easeOut" }}
	>
		{children}
	</motion.div>
);

const SectionTitle = ({
	pre,
	title,
}: {
	pre?: string;
	title: string;
}) => (
	<div className="text-center mb-8">
		{pre && (
			<p className="font-script text-2xl text-primary/80">{pre}</p>
		)}
		<h2 className="font-display text-3xl md:text-5xl text-foreground text-shadow-soft">
			{title}
		</h2>
		<div className="flex justify-center gap-1 mt-2">
			{[0, 1, 2].map((i) => (
				<span
					key={i}
					className="w-2 h-2 rounded-full bg-primary/60"
					style={{ animation: `twinkle 2s ease-in-out infinite ${i * 0.2}s` }}
				/>
			))}
		</div>
	</div>
);


const Index = () => {
	const [opened, setOpened] = useState(false);
	const audioRef = useRef(null);

	const handleOpenInvitation = async () => {
		setOpened(true);

		if (audioRef.current) {
			try {
				audioRef.current.volume = 0.35; // suavecito
				await audioRef.current.play();
			} catch (err) {
				console.log("No se pudo reproducir audio", err);
			}
		}
	};

	return (
		<>
			<FloatingScene />
			<audio ref={audioRef} loop preload="auto">
				<source src={fondoMP3} type="audio/mpeg" />
			</audio>


			<AnimatePresence>
				{!opened && <EnvelopeIntro onOpen={handleOpenInvitation} />}
			</AnimatePresence>



			<main
				className={`relative z-10 mx-auto max-w-2xl px-5 pb-24 transition-opacity duration-700 ${opened ? "opacity-100" : "opacity-0"
					}`}
			>
				{/* HERO */}
				<section className="pt-12 pb-16 text-center">
					<FadeUp>
						<p className="font-script text-3xl text-primary mb-2">
							¡Pronto llegaré!
						</p>
					</FadeUp>

					<motion.div
						initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
						animate={opened ? { scale: 1, opacity: 1, rotate: 0 } : {}}
						transition={{
							type: "spring",
							stiffness: 90,
							delay: 0.4,
							duration: 1,
						}}
						className="relative my-4"
					>
						<img
							src={heroBear}
							alt="Osito bebé durmiendo en una nube con la luna"
							width={1024}
							height={1024}
							className="w-full max-w-md mx-auto drop-shadow-[0_25px_50px_hsl(207_70%_55%/0.3)]"
						/>
						{/* floating sparkles */}
						<motion.span
							className="absolute top-6 left-4 text-3xl"
							animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
							transition={{ duration: 4, repeat: Infinity }}
						>
							✨
						</motion.span>
						<motion.span
							className="absolute bottom-12 right-6 text-2xl"
							animate={{ y: [0, -8, 0] }}
							transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
						>
							💫
						</motion.span>
					</motion.div>

					<FadeUp delay={0.8}>
						<h1 className="font-display text-5xl md:text-7xl text-primary text-shadow-soft leading-none">
							Oliver
							<br />
							<span className="font-script text-6xl md:text-8xl text-[hsl(218_45%_28%)] block -mt-2">
								Noah
							</span>
						</h1>
					</FadeUp>

					<FadeUp delay={1}>
						<p className="font-display text-lg md:text-xl text-foreground/70 mt-6 max-w-md mx-auto">
							Mis papás te invitan a celebrar mi llegada en mi
							<span className="text-primary font-semibold"> Baby Shower</span> 🧸💙
						</p>
					</FadeUp>

					<motion.div
						className="mt-8 inline-flex items-center gap-2 px-5 py-2 bg-white/70 backdrop-blur rounded-full border-2 border-white shadow-soft"
						animate={{ y: [0, -4, 0] }}
						transition={{ duration: 3, repeat: Infinity }}
					>
						<span className="text-2xl">🎀</span>
						<span className="font-script text-xl text-primary">
							Es niño
						</span>
						<span className="text-2xl">💙</span>
					</motion.div>
				</section>

				{/* COUNTDOWN */}
				<section className="my-12">
					<FadeUp>
						<SectionTitle pre="Falta poquito" title="Cuenta regresiva" />
					</FadeUp>
					<FadeUp delay={0.2}>
						<Countdown targetDate={EVENT_DATE} />
					</FadeUp>
					<FadeUp delay={0.4}>
						<div className="flex justify-center mt-6">
							<motion.img
								src={elephant}
								alt="Elefantito con globo azul"
								width={768}
								height={768}
								loading="lazy"
								className="w-40 md:w-52"
								animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
								transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
							/>
						</div>
					</FadeUp>
				</section>

				{/* EVENT DETAILS */}
				<section className="my-16">
					<FadeUp>
						<SectionTitle pre="Te esperamos" title="Datos del evento" />
					</FadeUp>

					<div className="space-y-4">
						{[
							{
								icon: <Calendar className="w-6 h-6" />,
								label: "Sábado 30 de Mayo, 2026",
								sub: "Marca tu calendario",
							},
							{
								icon: <Clock className="w-6 h-6" />,
								label: "2:00 pm",
								sub: "Llega puntual, hay sorpresas",
							},
							{
								icon: <MapPin className="w-6 h-6" />,
								label: "Bretaña 152",
								sub: "San Andres Tetepilco, Iztapalapa, CDMX",
							},
						].map((item, i) => (
							<FadeUp key={item.label} delay={i * 0.15}>
								<div className="flex items-center gap-4 bg-card-soft rounded-3xl p-5 border-2 border-white shadow-soft hover:scale-[1.02] transition-transform">
									<div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center border-2 border-primary/20">
										{item.icon}
									</div>
									<div>
										<div className="font-display text-lg text-foreground">
											{item.label}
										</div>
										<div className="font-body text-sm text-muted-foreground">
											{item.sub}
										</div>
									</div>
								</div>
							</FadeUp>
						))}
					</div>

					{/* 👇 BOTÓN */}
					<FadeUp delay={0.6}>
						<a
							href="https://www.google.com/maps/dir/?api=1&destination=Bretaña+152+San+Andres+Tetepilco+Iztapalapa+CDMX"
							target="_blank"
							rel="noopener noreferrer"
							className="block text-center mt-6 bg-primary text-white font-semibold py-4 rounded-2xl shadow-soft hover:scale-105 transition-transform"
						>
							📍 Cómo llegar
						</a>
					</FadeUp>
				</section>



				{/* RSVP */}
				<section id="rsvp" className="my-16">
					<FadeUp>
						<SectionTitle pre="Confírmanos" title="¿Vendrás?" />
					</FadeUp>

					<FadeUp delay={0.2}>
						<div className="relative bg-white rounded-[2.5rem] p-6 md:p-8 border-2 border-white shadow-cloud">
							<img
								src={bunny}
								alt="Conejito con moño azul"
								width={768}
								height={768}
								loading="lazy"
								className="absolute -top-16 -right-4 w-28 md:w-32 animate-bob"
							/>
							<RsvpForm />
						</div>
					</FadeUp>
				</section>

				{/* MESSAGE */}
				<section className="my-16 text-center">
					<FadeUp>
						<div className="relative bg-gradient-to-br from-[hsl(45_95%_92%)] to-[hsl(205_85%_92%)] rounded-[2.5rem] p-8 border-2 border-white shadow-soft">
							<div className="text-5xl mb-3 inline-block animate-heartbeat">
								💌
							</div>
							<h3 className="font-display text-2xl text-foreground">
								Un mensaje para mí
							</h3>
							<p className="font-script text-2xl md:text-3xl text-primary mt-4 leading-snug">
								"Eres el sueño más bonito que tuvimos…
								<br />y pronto serás realidad."
							</p>
							<p className="font-body text-sm text-muted-foreground mt-4">
								— Con amor, mamá &amp; papá
							</p>
						</div>
					</FadeUp>
				</section>

				{/* FOOTER */}
				<footer className="text-center mt-16">
					<motion.div
						className="text-4xl"
						animate={{ rotate: [-10, 10, -10] }}
						transition={{ duration: 4, repeat: Infinity }}
					>
						🧸
					</motion.div>
					<p className="font-script text-2xl text-primary mt-2">
						¡Te esperamos, Oliver Noah!
					</p>
				</footer>
			</main>
		</>
	);
};

export default Index;
