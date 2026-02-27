const Governance = (props) => {
	return (
		<section id="governance" aria-labelledby="gov-heading">
			<canvas id="governance-canvas" aria-hidden="true"></canvas>
			<div className="container governance-content">
				<div className="governance-header">
					<span className="section-label">Governance</span>
					<h2 id="gov-heading">Enterprise AI You Can Trust</h2>
					<p>
						Every Vecter deployment is built with control, compliance, and
						transparency as first-class requirements — not afterthoughts.
					</p>
				</div>
				<div className="governance-pillars">
					<div className="pillar-card">
						<div className="pillar-icon">🎛️</div>
						<div className="pillar-num">PILLAR 01</div>
						<h3>Control</h3>
						<p>
							Human approval built into critical decisions to ensure safe,
							accountable automation. AI acts within defined parameters — your
							team stays in command.
						</p>
					</div>
					<div className="pillar-card">
						<div className="pillar-icon">✅</div>
						<div className="pillar-num">PILLAR 02</div>
						<h3>Compliance</h3>
						<p>
							Aligned with Australian regulatory and data security standards
							from day one. APRA, Privacy Act, and sector-specific compliance
							built into every architecture.
						</p>
					</div>
					<div className="pillar-card">
						<div className="pillar-icon">👁️</div>
						<div className="pillar-num">PILLAR 03</div>
						<h3>Transparency</h3>
						<p>
							Full visibility into AI actions, cost, and performance. No black
							box systems. Every decision is logged, explainable, and auditable.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Governance;
