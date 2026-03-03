import { useScrollReveal } from "@utils/useScrollReveal";

const Services = (props) => {
	return (
		<div id="services" className="wrapper services-section">
			<div className="container">
				<div className="wrapper">
					<div
						className="section-header"
						ref={useScrollReveal({ direction: "top" })}
					>
						<h2>Our AI Consulting Services</h2>
						<p style={{ color: "var(--secondary-text)" }}>
							Tailored for Australian businesses. Launch secure AI solutions in
							under 48 hours. From strategy to agents—deploy, secure, scale.
						</p>
					</div>

					<div className="grid-container">
						<div
							className="service-card"
							ref={useScrollReveal({ direction: "right" })}
						>
							<h4>AI Strategy & Roadmap</h4>
							<p>
								Develop a custom AI roadmap aligned with your goals. Includes
								readiness assessments and quick-win identification.
							</p>
							<a href="#" className="btn btn-outline">
								Get Started &rarr;
							</a>
						</div>
						<div
							className="service-card"
							ref={useScrollReveal({ direction: "left" })}
						>
							<h4>AI Governance & Risk</h4>
							<p>
								Build ethical frameworks, compliance checks, and risk
								management. Ensure secure, transparent AI under AU standards.
							</p>
							<a href="#" className="btn btn-outline">
								Configure &rarr;
							</a>
						</div>
						<div
							className="service-card"
							ref={useScrollReveal({ direction: "right" })}
						>
							<h4>Custom AI Agents</h4>
							<p>
								Design and deploy intelligent agents for automation,
								decision-making, and workflows. Integrate with Microsoft Azure
								or AWS.
							</p>
							<a href="#" className="btn btn-outline">
								Build Now &rarr;
							</a>
						</div>
						<div
							className="service-card"
							ref={useScrollReveal({ direction: "left" })}
						>
							<h4>Automation Implementation</h4>
							<p>
								Streamline operations with AI-powered workflows, integrations,
								and optimizations. Focus on efficiency gains.
							</p>
							<a href="#" className="btn btn-outline">
								Automate &rarr;
							</a>
						</div>
						<div
							className="service-card"
							ref={useScrollReveal({ direction: "right" })}
						>
							<h4>Training & Adoption</h4>
							<p>
								Hands-on training for your team, plus ongoing support. Includes
								AI upskilling and change management.
							</p>
							<a href="#" className="btn btn-outline">
								Train Team &rarr;
							</a>
						</div>
						<div
							className="service-card"
							ref={useScrollReveal({ direction: "left" })}
						>
							<h4>Cost & ROI Dashboard</h4>
							<p>
								Monitor AI costs, usage, and returns. Prevent overruns and track
								value.
							</p>
							<a href="#" className="btn btn-outline">
								Monitor &rarr;
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Services;
