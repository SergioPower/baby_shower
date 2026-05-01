import { motion } from "framer-motion";
import cloudImg from "@/assets/cloud.png";
import moonImg from "@/assets/moon.png";

const Star = ({ size = 14, delay = 0 }: { size?: number; delay?: number }) => (
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="hsl(var(--star))"
		style={{ animationDelay: `${delay}s` }}
		className="animate-twinkle drop-shadow-[0_0_8px_hsl(var(--star)/0.8)]"
	>
		<path d="M12 1l2.5 7.5H22l-6.2 4.5 2.4 7.5L12 16l-6.2 4.5 2.4-7.5L2 8.5h7.5z" />
	</svg>
);

export const FloatingScene = () => {
	// Stable random positions
	const stars = Array.from({ length: 22 }).map((_, i) => ({
		id: i,
		top: `${(i * 47) % 95}%`,
		left: `${(i * 73) % 95}%`,
		size: 8 + (i % 4) * 4,
		delay: (i % 5) * 0.4,
	}));

	return (
		<div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			{/* Drifting clouds */}
			<motion.img
				src={cloudImg}
				alt=""
				className="absolute w-32 opacity-80"
				style={{ top: "8%" }}
				animate={{ x: ["-15vw", "115vw"] }}
				transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
			/>
			<motion.img
				src={cloudImg}
				alt=""
				className="absolute w-24 opacity-70"
				style={{ top: "22%" }}
				animate={{ x: ["115vw", "-15vw"] }}
				transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
			/>
			<motion.img
				src={cloudImg}
				alt=""
				className="absolute w-40 opacity-60"
				style={{ top: "55%" }}
				animate={{ x: ["-15vw", "115vw"] }}
				transition={{ duration: 90, repeat: Infinity, ease: "linear", delay: 10 }}
			/>
			<motion.img
				src={cloudImg}
				alt=""
				className="absolute w-28 opacity-75"
				style={{ top: "78%" }}
				animate={{ x: ["115vw", "-15vw"] }}
				transition={{ duration: 70, repeat: Infinity, ease: "linear", delay: 5 }}
			/>

			{/* Moon */}
			<motion.img
				src={moonImg}
				alt=""
				className="absolute right-6 top-32 w-20 md:w-28"
				animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
				transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
			/>

			{/* Twinkling stars */}
			{stars.map((s) => (
				<div
					key={s.id}
					className="absolute"
					style={{ top: s.top, left: s.left }}
				>
					<Star size={s.size} delay={s.delay} />
				</div>
			))}
		</div>
	);
};
