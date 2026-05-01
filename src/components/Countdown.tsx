import { useEffect, useState } from "react";

interface Props {
	// ISO date string of the event
	targetDate: string;
}

const calc = (target: number) => {
	const now = Date.now();
	const diff = Math.max(0, target - now);
	return {
		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
		hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
		minutes: Math.floor((diff / (1000 * 60)) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	};
};

export const Countdown = ({ targetDate }: Props) => {
	const target = new Date(targetDate).getTime();
	const [time, setTime] = useState(() => calc(target));

	useEffect(() => {
		const id = setInterval(() => setTime(calc(target)), 1000);
		return () => clearInterval(id);
	}, [target]);

	const items = [
		{ label: "Días", value: time.days },
		{ label: "Horas", value: time.hours },
		{ label: "Min", value: time.minutes },
		{ label: "Seg", value: time.seconds },
	];

	return (
		<div className="grid grid-cols-4 gap-3 md:gap-5 max-w-md mx-auto">
			{items.map((it) => (
				<div
					key={it.label}
					className="relative bg-card-soft rounded-3xl p-3 md:p-5 text-center shadow-soft border-2 border-white"
				>
					<div className="font-display text-3xl md:text-5xl text-primary tabular-nums">
						{String(it.value).padStart(2, "0")}
					</div>
					<div className="text-xs md:text-sm font-display text-muted-foreground mt-1">
						{it.label}
					</div>
				</div>
			))}
		</div>
	);
};
