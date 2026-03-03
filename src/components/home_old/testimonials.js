import { useEffect, useState } from "react";

export default function TestimonialCarousel() {
	const testimonials = [
		{
			text: "Vecter's AI agents transformed our workflows—497% ROI in 6 months!",
			author: "– Retail Client, Melbourne",
		},
		{
			text: "Secure governance gave us confidence to scale AI ethically.",
			author: "– Finance Firm, Sydney",
		},
	];

	const [activeIdx, setActiveIdx] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	const goLeft = () =>
		setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
	const goRight = () =>
		setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

	useEffect(() => {
		if (isPaused) return;
		const interval = setInterval(() => {
			setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
		}, 4000);
		return () => clearInterval(interval);
	}, [isPaused, testimonials.length]);

	return (
		<div id="cases" className="wrapper cases-section">
			<div className="container">
				<div className="wrapper">
					<h2>Client Success Stories</h2>
					<p>Placeholders inspired by real testimonials from peers.</p>
					<div
						className="wrapper testimonial-carousel"
						onMouseEnter={() => setIsPaused(true)}
						onMouseLeave={() => setIsPaused(false)}
					>
						<div className="wrapper hidden-overflow">
							<button className="goLeft" onClick={goLeft} aria-label="Previous">
								&#8592;
							</button>
							<div
								className="testimonial-track"
								style={{
									transform: `translateX(-${activeIdx * 100}%)`,
									transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
								}}
							>
								{testimonials.map((t, i) => (
									<div
										className={`testimonial-card${i === activeIdx ? " active" : ""}`}
										key={i}
										style={{
											opacity: i === activeIdx ? 1 : 0.7,
											transition: "opacity 0.5s",
										}}
									>
										<p>"{t.text}"</p>
										<span>{t.author}</span>
									</div>
								))}
							</div>
							<button className="goRight" onClick={goRight} aria-label="Next">
								&#8594;
							</button>
							<div className="testimonial-dots">
								{testimonials.map((_, i) => (
									<span
										key={i}
										onClick={() => setActiveIdx(i)}
										style={{
											background: i === activeIdx ? "#0044cc" : "#e5e5e5",
										}}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
