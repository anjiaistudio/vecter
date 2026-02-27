import { useScrollReveal } from "@utils/useScrollReveal";

const Enterprise = (props) => {
	return (
		<div id="enterprise" className="wrapper enterprise-section">
			<div className="container">
				<div className="wrapper enterprise-content">
					<div ref={useScrollReveal({ direction: "left" })}>
						<h2>Enterprise AI Governance Protocol.</h2>
						<p className="wrapper">
							For Australian enterprises needing robust AI. We architect secure,
							compliant systems with human-in-the-loop safeguards.
						</p>
						<div className="wrapper">
							<a href="/" className="btn btn-primary">
								Request Free Audit
							</a>
						</div>
					</div>
					<div ref={useScrollReveal({ direction: "right" })}>
						<ul className="enterprise-list">
							<li>
								<span className="check">01 /</span>
								<div>
									<strong>Ethical AI Frameworks</strong>
									<br />
									<span style={{ color: "#666", fontSize: "14px" }}>
										Compliant with AU standards, no public data training.
									</span>
								</div>
							</li>
							<li>
								<span className="check">02 /</span>
								<div>
									<strong>Human Oversight</strong>
									<br />
									<span style={{ color: "#666", fontSize: "14px" }}>
										Approval gates for decisions (inspired by OfficePro).
									</span>
								</div>
							</li>
							<li>
								<span className="check">03 /</span>
								<div>
									<strong>Audit & Transparency</strong>
									<br />
									<span style={{ color: "#666", fontSize: "14px" }}>
										Full logging for accountability (from AI Consulting Group).
									</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Enterprise;
