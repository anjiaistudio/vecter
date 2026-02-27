import { useScrollReveal } from "@utils/useScrollReveal";
import { useEffect, useRef, useState } from "react";

const Process = (props) => {
	// TimelineProgress component must be outside App
	function TimelineProgress() {
		const timelineRef = useRef(null);
		const [progress, setProgress] = useState(0);

		useEffect(() => {
			const handleScroll = () => {
				if (!timelineRef.current) return;
				const steps = Array.from(
					timelineRef.current.querySelectorAll(".timeline-step"),
				);
				const barHeight = timelineRef.current.getBoundingClientRect().height;
				const wrapperTop = timelineRef.current.getBoundingClientRect().top;
				const viewportCenter = window.innerHeight / 2;

				// Find the step whose center is closest to the viewport center
				let closestIdx = 0;
				let minDist = Infinity;
				let stepCenters = [];
				steps.forEach((step, idx) => {
					const rect = step.getBoundingClientRect();
					const center = rect.top + rect.height / 2;
					stepCenters.push(center);
					const dist = Math.abs(center - viewportCenter);
					if (dist < minDist) {
						minDist = dist;
						closestIdx = idx;
					}
				});

				// Calculate progress: fill up to the center of the closest step
				let percent = 0;
				if (steps.length > 1) {
					// The bar starts at the center of the first step and ends at the center of the last
					const start = stepCenters[0];
					const end = stepCenters[stepCenters.length - 1];
					const target = stepCenters[closestIdx];
					percent = (target - start) / (end - start);
					percent = Math.max(0, Math.min(1, percent));
					steps[closestIdx].classList.add("scrolled");
				} else {
					percent = 0;
					steps[closestIdx].classList.remove("scrolled");
				}
				setProgress(percent);
			};
			window.addEventListener("scroll", handleScroll);
			window.addEventListener("resize", handleScroll);
			handleScroll();
			return () => {
				window.removeEventListener("scroll", handleScroll);
				window.removeEventListener("resize", handleScroll);
			};
		}, []);

		return (
			<div className="timeline-progress-wrapper" ref={timelineRef}>
				<div className="timeline-progress-bar-bg" />
				<div
					className="timeline-progress-bar"
					style={{ height: `${progress * 100}%` }}
				/>
				<div className="timeline-steps">
					<div
						className="timeline-step"
						ref={useScrollReveal({ direction: "left" })}
					>
						<div className="timeline-content">
							<h3>Discover</h3>
							<p>
								Free readiness assessment to identify opportunities and gaps in
								your current setup.
							</p>
						</div>
					</div>
					<div
						className="timeline-step"
						ref={useScrollReveal({ direction: "right" })}
					>
						<div className="timeline-content">
							<h3>Design</h3>
							<p>
								Tailored strategy, governance frameworks, and custom agent
								blueprints.
							</p>
						</div>
					</div>
					<div
						className="timeline-step"
						ref={useScrollReveal({ direction: "left" })}
					>
						<div className="timeline-content">
							<h3>Deploy</h3>
							<p>
								Secure implementation with seamless integrations and testing.
							</p>
						</div>
					</div>
					<div
						className="timeline-step"
						ref={useScrollReveal({ direction: "right" })}
					>
						<div className="timeline-content">
							<h3>Optimize</h3>
							<p>
								Ongoing monitoring, team training, and scaling for maximum ROI.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div id="process" className="wrapper process-section dark-bg">
			<div className="container">
				<div className="wrapper">
					<div className="process-title">
						<h2 ref={useScrollReveal({ direction: "top" })}>
							Our Proven AI Consulting Process
						</h2>
						<p ref={useScrollReveal({ direction: "top" })}>
							Inspired by industry leaders our step-by-step delivery.
						</p>
					</div>
					<TimelineProgress />
				</div>
			</div>
		</div>
	);
};

export default Process;
