const Footer = (props) => {
	return (
		<footer role="contentinfo">
			<div className="container">
				<div className="footer-grid">
					<div>
						<div className="footer-brand-name">Vecter</div>
						<p className="footer-brand-desc">
							Governance-first AI automation for enterprise. We deliver
							measurable ROI without exposing your business to risk. Deep
							Microsoft ecosystem expertise — M365, Power Automate, Azure AI,
							Copilot — combined with multi-platform AI across Anthropic,
							OpenAI, and AWS Bedrock.
						</p>
						<a
							href="mailto:hello@vecter.com.au"
							className="btn btn-dark"
							style={{ "font-size": "13px", padding: "10px 20px" }}
						>
							hello@vecter.com.au
						</a>
					</div>
					<div className="footer-col">
						<h5>Services</h5>
						<ul>
							<li>
								<a href="#services">AI Consulting &amp; Strategy</a>
							</li>
							<li>
								<a href="#services">Agentic Workflows</a>
							</li>
							<li>
								<a href="#services">AI Governance</a>
							</li>
							<li>
								<a href="#services">Data Foundations</a>
							</li>
							<li>
								<a href="#services">AI Onboarding</a>
							</li>
						</ul>
					</div>
					<div className="footer-col">
						<h5>Industries</h5>
						<ul>
							<li>
								<a href="#sectors">Telecommunications</a>
							</li>
							<li>
								<a href="#sectors">Financial Services</a>
							</li>
							<li>
								<a href="#sectors">Healthcare &amp; Logistics</a>
							</li>
							<li>
								<a href="#sectors">Public Sector</a>
							</li>
							<li>
								<a href="#sectors">Professional Services</a>
							</li>
						</ul>
					</div>
					<div className="footer-col">
						<h5>Company</h5>
						<ul>
							<li>
								<a href="#team">About</a>
							</li>
							<li>
								<a href="#governance">Governance</a>
							</li>
							<li>
								<a href="#get-started">Contact</a>
							</li>
							<li>
								<a href="mailto:hello@vecter.com.au">hello@vecter.com.au</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="footer-bottom">
					<p>© 2025 Vecter Pty Ltd. All rights reserved. ABN: vecter.com.au</p>
					<div className="footer-legal">
						<a href="#hero">Privacy Policy</a>
						<a href="#hero">Terms of Use</a>
						<a href="#hero">Data Sovereignty</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
