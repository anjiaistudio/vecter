import {
  CryptoNetworkBackground,
  OrbitalRingsCanvas,
  TopographicTerrainCanvas,
} from "@components/backgrounds";
import { useEffect, useRef, useState } from "react";

export default function Banner({
	items = null,
	initialIndex = 0,
	autoplay = false,
	interval = 5000,
	onChange,
	nav = true,
	dots = true,
}) {
	const defaultItems = [
		{
			title: "Scale Faster. Reduce Cost. Control AI Risk.",
			// subtitle: "Deploy. Secure. Scale.",
			text: "For COOs scaling operations, CIOs securing AI adoption, CFOs reducing operating cost, and Heads of Ops automating execution. Vecter delivers governance-first AI that produces measurable ROI without exposing your business.",
			subText:
				"Every month without AI automation increases avoidable operational cost.",
			ctaPrimary: { href: "#enterprise", label: "See Your AI ROI Projection" },
			// ctaSecondary: { href: "#services", label: "Explore Services" },
		},
		{
			title: "Cut Manual Work Costs by Up to 80% with Secure AI Automation.",
			// subtitle: "Deploy. Secure. Scale.",
			text: "Turn $45/hour human tasks into $0.04 automated workflows. AI is not about headcount reduction. It is about enabling your team to operate faster, smarter, and with greater strategic focus.",
			subText: "Operational inefficiency compounds over time. AI does not.",
			ctaPrimary: { href: "#enterprise", label: "Book Free AI Assessment" },
			// ctaSecondary: { href: "#services", label: "Explore Services" },
		},
		{
			title:
				"Build Enterprise AI That Reduces Cost, Controls Risk, and Scales Margin.",
			// subtitle: "Deploy. Secure. Scale.",
			text: "Your people stay in control. AI handles repetition. Leadership drives decisions.",
			subText: "Board-level AI risk is rising faster than policy adoption.",
			ctaPrimary: { href: "#enterprise", label: "View AI Opportunities" },
			// ctaSecondary: { href: "#services", label: "Explore Services" },
		},
	];

	const slides = items && items.length ? items : defaultItems;
	const [selected, setSelected] = useState(() =>
		Math.max(0, Math.min(initialIndex, slides.length - 1)),
	);
	const autoplayRef = useRef(null);
	const [isPaused, setIsPaused] = useState(false);

	useEffect(() => {
		if (onChange) onChange(selected);
	}, [selected, onChange]);

	useEffect(() => {
		// only run when autoplay enabled, not paused, and more than one slide
		if (!autoplay || isPaused || slides.length <= 1) return undefined;
		autoplayRef.current = setInterval(() => {
			setSelected((s) => (s === slides.length - 1 ? 0 : s + 1));
		}, interval);
		return () => clearInterval(autoplayRef.current);
	}, [autoplay, interval, slides.length, isPaused]);

	function goPrev() {
		setSelected((s) => (s === 0 ? slides.length - 1 : s - 1));
	}

	function goNext() {
		setSelected((s) => (s === slides.length - 1 ? 0 : s + 1));
	}

	function goTo(i) {
		setSelected(Math.max(0, Math.min(i, slides.length - 1)));
	}

	return (
		<div className="wrapper hero">
			<div
				className="banner-carousel"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
			>
				<div
					className="banner-track"
					style={{
						display: "flex",
						width: `${slides.length * 100}%`,
						transform: `translateX(-${selected * (100 / slides.length)}%)`,
						transition: "transform 0.5s ease",
					}}
				>
					{slides.map((s, i) => (
						<div
							key={i}
							className="wrapper banner-slide"
							style={{
								minWidth: `${100 / slides.length}%`,
								position: "relative",
							}}
						>
							{/* Background only for first slide */}
							{i == 0 && <CryptoNetworkBackground />}
							{i == 1 && <TopographicTerrainCanvas />}
							{i == 2 && <OrbitalRingsCanvas />}
							<div className="container">
								<div className="wrapper banner_inside">
									<h1>{s.title}</h1>
									<h5>{s.subText}</h5>
									<h6 className="tagline">{s.subtitle}</h6>
									<p>{s.text}</p>
									<div className="hero-actions">
										{s.ctaSecondary && (
											<a href={s.ctaSecondary.href} className="btn btn-outline">
												{s.ctaSecondary.label}
											</a>
										)}
										{s.ctaPrimary && (
											<a href={s.ctaPrimary.href} className="btn btn-highlight">
												{s.ctaPrimary.label}
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{slides.length > 1 && (
					<div className="banner-nav">
						{nav && (
							<button
								aria-label="Previous"
								className="banner-prev"
								onClick={goPrev}
							>
								‹
							</button>
						)}
						{dots && (
							<div className="banner-dots">
								{slides.map((_, i) => (
									<button
										key={i}
										aria-label={`Go to slide ${i + 1}`}
										className={`banner-dot${i === selected ? " selected" : ""}`}
										onClick={() => goTo(i)}
									/>
								))}
							</div>
						)}
						{nav && (
							<button
								aria-label="Next"
								className="banner-next"
								onClick={goNext}
							>
								›
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
