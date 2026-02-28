const Services = (props) => {
	return (
		<div
			id="services"
			className="wrapper services dark-bg"
			aria-labelledby="services-heading"
		>
			<div className="container">
				<div className="wrapper services-header">
					<span className="section-label">Our Process</span>
					<h2 className="wrapper" id="services-heading">
						How We Deliver AI That Works
					</h2>
					<p>
						We don't just recommend AI — we build, deploy, and improve it. Every
						engagement follows a proven methodology designed to produce real
						business outcomes.
					</p>
				</div>
				<div className="wrapper services-cards">
					<div className="service-card">
						<div className="service-num">01 — DISCOVER</div>
						<h3>Map &amp; Prioritise</h3>
						<p>
							We map your operations to identify immediate cost-to-serve
							reduction and automation opportunities. We define ROI targets and
							identify where manual bottlenecks can be eliminated safely with
							AI.
						</p>
						<div className="process-steps">
							<div className="process-step">
								<div className="process-step-dot"></div>
								<span>Operations audit &amp; workflow mapping</span>
							</div>
							<div className="process-step">
								<div className="process-step-dot"></div>
								<span>ROI target definition</span>
							</div>
							<div className="process-step">
								<div className="process-step-dot"></div>
								<span>Risk &amp; feasibility assessment</span>
							</div>
						</div>
					</div>
					<div className="service-card">
						<div className="service-num">02 — DESIGN &amp; DEVELOP</div>
						<h3>Engineer &amp; Integrate</h3>
						<p>
							Our AI architects engineer secure data flows and execute
							comprehensive workflow redesign. We integrate natively with your
							enterprise stack — Microsoft 365, Power Automate, Azure AI,
							Copilot, and beyond — mapping agentic workflows and maximising
							your existing platform investments.
						</p>
						<div className="process-steps">
							<div className="process-step">
								<div className="process-step-dot"></div>
								<span>Secure AI architecture design</span>
							</div>
							<div className="process-step">
								<div className="process-step-dot"></div>
								<span>Agentic workflow development</span>
							</div>
							<div className="process-step">
								<div className="process-step-dot"></div>
								<span>Microsoft &amp; multi-platform integration</span>
							</div>
						</div>
					</div>
					<div className="service-card">
						<div className="service-num">03 — DEPLOY &amp; IMPROVE</div>
						<h3>Launch &amp; Optimise</h3>
						<p>
							We launch AI systems into production with strict human-in-the-loop
							safeguards, then monitor execution to ensure continuous margin
							improvement and throughput acceleration.
						</p>
						<div className="process-steps">
							<div className="process-step">
								<div className="process-step-dot"></div>
								<span>Human-in-the-loop controls</span>
							</div>
							<div className="process-step">
								<div className="process-step-dot"></div>
								<span>Live performance monitoring</span>
							</div>
							<div className="process-step">
								<div className="process-step-dot"></div>
								<span>Continuous throughput improvement</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Services;
