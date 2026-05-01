import { motion, AnimatePresence } from "framer-motion";
import envelopeImg from "@/assets/envelope.png";

interface Props {
	onOpen: () => void;
}

export const EnvelopeIntro = ({ onOpen }: Props) => {
	return (
		<motion.div
			key="envelope"
			initial={{ opacity: 1 }}
			exit={{ opacity: 0, scale: 1.4, transition: { duration: 0.6 } }}
			className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 bg-storybook"
		>
			<motion.p
				initial={{ y: -20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="font-script text-3xl md:text-4xl text-primary mb-4"
			>
				¡Tienes una sorpresa!
			</motion.p>

			<motion.button
				onClick={onOpen}
				initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
				animate={{ scale: 1, opacity: 1, rotate: 0 }}
				transition={{ type: "spring", stiffness: 120, delay: 0.4 }}
				whileHover={{ scale: 1.05, rotate: 2 }}
				whileTap={{ scale: 0.95 }}
				className="relative group cursor-pointer"
				aria-label="Abrir invitación"
			>
				<motion.div
					animate={{ y: [0, -12, 0] }}
					transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
				>
					<img
						src={envelopeImg}
						alt="Sobre con invitación de baby shower"
						width={1024}
						height={1024}
						className="w-64 md:w-80 drop-shadow-[0_20px_40px_hsl(207_70%_55%/0.4)]"
					/>
				</motion.div>
				{/* Sparkles around */}
				{[0, 1, 2, 3].map((i) => (
					<motion.div
						key={i}
						className="absolute text-2xl"
						style={{
							top: `${[10, 80, 20, 70][i]}%`,
							left: `${[-10, 90, 95, -5][i]}%`,
						}}
						animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.4, 1, 0.4] }}
						transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
					>
						✨
					</motion.div>
				))}
			</motion.button>

			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.8 }}
				className="mt-10 flex flex-col items-center gap-2"
			>
				<p className="font-display text-lg md:text-xl text-foreground/80">
					Toca el sobre para abrir
				</p>
				<motion.div
					animate={{ y: [0, 6, 0] }}
					transition={{ duration: 1.2, repeat: Infinity }}
					className="text-primary text-2xl"
				>
					👇
				</motion.div>
			</motion.div>
		</motion.div>
	);
};
