import { useEffect } from "react";
const Sectors = (props) => {
	useEffect(() => {
		const handleTabClick = (event) => {
			const clickedTab = event.currentTarget;
			const tabs = document.querySelectorAll(".sector-tab");
			tabs.forEach((t) => {
				t.classList.remove("active");
				t.setAttribute("aria-selected", "false");
			});
			clickedTab.classList.add("active");
			clickedTab.setAttribute("aria-selected", "true");
			document
				.querySelectorAll(".sector-panel")
				.forEach((p) => p.classList.remove("active"));
			const panelId = "sector-" + clickedTab.dataset.sector;
			const panel = document.getElementById(panelId);
			if (panel) panel.classList.add("active");
		};

		const tabs = document.querySelectorAll(".sector-tab");
		tabs.forEach((tab) => {
			tab.addEventListener("click", handleTabClick);
		});

		// Cleanup function to remove event listeners
		return () => {
			tabs.forEach((tab) => {
				tab.removeEventListener("click", handleTabClick);
			});
		};
	}, []);
	return (
		<section id="sectors" aria-labelledby="sectors-heading">
			<div className="container">
				<div className="sectors-header">
					<span className="section-label">Sector Architectures</span>
					<h2 id="sectors-heading">Built for Your Industry's Complexity</h2>
					<p className="mt-1x">
						Purpose-built AI architectures that understand the compliance, data,
						and operational realities of your sector.
					</p>
				</div>
				<div className="sectors-tabs-row" role="tablist">
					<button
						className="sector-tab active"
						data-sector="telco"
						role="tab"
						aria-selected="true"
					>
						Telecommunications
					</button>
					<button
						className="sector-tab"
						data-sector="finance"
						role="tab"
						aria-selected="false"
					>
						Financial Services
					</button>
					<button
						className="sector-tab"
						data-sector="health"
						role="tab"
						aria-selected="false"
					>
						Healthcare &amp; Logistics
					</button>
					<button
						className="sector-tab"
						data-sector="public"
						role="tab"
						aria-selected="false"
					>
						Public Sector
					</button>
				</div>

				<div className="sector-panel active" id="sector-telco" role="tabpanel">
					<div className="sector-metrics">
						<div className="sector-metric">
							<div className="sector-metric-val">40%</div>
							<div className="sector-metric-label">
								Reduction in Handle Time
							</div>
						</div>
						<div className="sector-metric">
							<div className="sector-metric-val">10M+</div>
							<div className="sector-metric-label">Daily Sessions</div>
						</div>
						<div className="sector-metric">
							<div className="sector-metric-val">99.9%</div>
							<div className="sector-metric-label">Uptime</div>
						</div>
					</div>
					<div className="sector-copy">
						<h3>Telecommunications</h3>
						<p>
							Automated customer routing, identity verification, and complex
							billing resolutions. Executing margin improvement strategies that
							vastly reduce manual agent dependency while maintaining rigorous
							compliance.
						</p>
						<a
							href="#get-started"
							className="btn btn-outline"
							style={{ marginTop: "28px" }}
						>
							See Telco Architecture →
						</a>
					</div>
				</div>

				<div className="sector-panel" id="sector-finance" role="tabpanel">
					<div className="sector-metrics">
						<div className="sector-metric">
							<div className="sector-metric-val">3x</div>
							<div className="sector-metric-label">Throughput Acceleration</div>
						</div>
						<div className="sector-metric">
							<div className="sector-metric-val">100%</div>
							<div className="sector-metric-label">Audit Traceability</div>
						</div>
						<div className="sector-metric">
							<div className="sector-metric-val">Zero-Day</div>
							<div className="sector-metric-label">Deployment</div>
						</div>
					</div>
					<div className="sector-copy">
						<h3>Financial Services</h3>
						<p>
							Deploying agentic workflow orchestration for compliance auditing,
							loan origination, and fraud detection. Accelerating throughput
							while maintaining strict APRA regulatory alignment and data
							sovereignty.
						</p>
						<a
							href="#get-started"
							className="btn btn-outline"
							style={{ marginTop: "28px" }}
						>
							See Finance Architecture →
						</a>
					</div>
				</div>

				<div className="sector-panel" id="sector-health" role="tabpanel">
					<div className="sector-metrics">
						<div className="sector-metric">
							<div className="sector-metric-val">60%</div>
							<div className="sector-metric-label">Faster Processing</div>
						</div>
						<div className="sector-metric">
							<div className="sector-metric-val">Real-time</div>
							<div className="sector-metric-label">Triage</div>
						</div>
						<div className="sector-metric">
							<div className="sector-metric-val">Secure</div>
							<div className="sector-metric-label">Data Handling</div>
						</div>
					</div>
					<div className="sector-copy">
						<h3>Healthcare &amp; Logistics</h3>
						<p>
							Automating patient and asset intake, secure record routing, and
							supply chain bottlenecks. Vecter agents process highly sensitive
							operational data within secure, private instances.
						</p>
						<a
							href="#get-started"
							className="btn btn-outline"
							style={{ marginTop: "28px" }}
						>
							See Healthcare Architecture →
						</a>
					</div>
				</div>

				<div className="sector-panel" id="sector-public" role="tabpanel">
					<div className="sector-metrics">
						<div className="sector-metric">
							<div className="sector-metric-val">100%</div>
							<div className="sector-metric-label">Data Sovereignty</div>
						</div>
						<div className="sector-metric">
							<div className="sector-metric-val">Govt-Grade</div>
							<div className="sector-metric-label">Encryption</div>
						</div>
						<div className="sector-metric">
							<div className="sector-metric-val">Scalable</div>
							<div className="sector-metric-label">Infrastructure</div>
						</div>
					</div>
					<div className="sector-copy">
						<h3>Public Sector</h3>
						<p>
							Secure AI deployment for government agencies. Sovereign data
							handling with full compliance and auditability across all
							citizen-facing and internal processes.
						</p>
						<a
							href="#get-started"
							className="btn btn-outline"
							style={{ marginTop: "28px" }}
						>
							See Public Sector Architecture →
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Sectors;
