const Capabilities = (props) => {
	return (
		<section id="capabilities" aria-labelledby="cap-heading">
			<div className="container">
				<div className="capabilities-header">
					<span className="section-label">Capabilities</span>
					<h2 id="cap-heading">Everything Your Enterprise AI Program Needs</h2>
					<p className="mt-1x">
						From strategy to production — our AI Consulting team covers the full
						stack of enterprise AI delivery.
					</p>
				</div>
				<div className="capabilities-grid">
					<div className="cap-card">
						<div className="cap-icon">🎯</div>
						<h3>AI Strategy &amp; ROI Roadmap</h3>
						<p>
							Define exactly where AI will create measurable business value. We
							map your operations, identify high-leverage opportunities, and
							build a clear path to execution.
						</p>
						<a href="#get-started" className="cap-cta">
							Find AI Wins →
						</a>
					</div>
					<div className="cap-card">
						<div className="cap-icon">🛡️</div>
						<h3>AI Governance &amp; Risk Control</h3>
						<p>
							Protect your organisation with governance-first AI.
							Human-in-the-loop controls, audit trails, and regulatory alignment
							built in from day one.
						</p>
						<a href="#get-started" className="cap-cta">
							Enable AI Governance →
						</a>
					</div>
					<div className="cap-card">
						<div className="cap-icon">🤖</div>
						<h3>Custom AI Agents &amp; Workflow Automation</h3>
						<p>
							Eliminate manual execution and accelerate operations with AI
							agents built for your specific processes across any enterprise
							platform.
						</p>
						<a href="#get-started" className="cap-cta">
							Automate Tasks →
						</a>
					</div>
					<div className="cap-card">
						<div className="cap-icon">⚡</div>
						<h3>Automation Implementation &amp; Integration</h3>
						<p>
							Turn AI strategy into operational impact. Native integration with
							Microsoft 365, Power Automate, Azure AI, and Copilot — plus
							cross-platform connectivity to OpenAI, Anthropic, AWS Bedrock, and
							your existing enterprise stack.
						</p>
						<a href="#get-started" className="cap-cta">
							Increase Throughput →
						</a>
					</div>
					<div className="cap-card">
						<div className="cap-icon">🎓</div>
						<h3>Training, Adoption &amp; Operational Enablement</h3>
						<p>
							Ensure your team confidently uses AI to drive results. Change
							management, training programmes, and ongoing support to accelerate
							adoption.
						</p>
						<a href="#get-started" className="cap-cta">
							Accelerate Adoption →
						</a>
					</div>
					<div className="cap-card">
						<div className="cap-icon">📊</div>
						<h3>Cost, Usage &amp; ROI Intelligence Dashboard</h3>
						<p>
							Maintain full financial and operational control of AI. Real-time
							visibility into cost, performance, and return across every AI
							system you run.
						</p>
						<a href="#get-started" className="cap-cta">
							Track AI ROI →
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Capabilities;
