import { Finance, HR, Legal, Telco } from "@utils/exportImages";
import { useEffect } from "react";

const CaseStudies = (props) => {
	useEffect(() => {
		const handleTabClick = (event) => {
			const clickedTab = event.currentTarget;
			const tabs = document.querySelectorAll(".case-tab");
			tabs.forEach((t) => {
				t.classList.remove("active");
				t.setAttribute("aria-selected", "false");
			});
			clickedTab.classList.add("active");
			clickedTab.setAttribute("aria-selected", "true");
			document
				.querySelectorAll(".case-panel")
				.forEach((p) => p.classList.remove("active"));
			const panelId = "panel-" + clickedTab.dataset.panel;
			const panel = document.getElementById(panelId);
			if (panel) panel.classList.add("active");
		};

		const tabs = document.querySelectorAll(".case-tab");
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
		<section id="case-studies" aria-labelledby="case-heading">
			<div className="container">
				<div className="case-header">
					<span className="section-label">Case Studies</span>
					<h2 id="case-heading">AI Delivering Measurable Business Outcomes</h2>
					<p style={{ "margin-top": "16px", "max-width": "520px" }}>
						See how Vecter's agentic AI systems are transforming enterprise
						operations across industries.
					</p>
				</div>
				<div className="case-layout">
					<div className="case-tabs" role="tablist">
						<div
							className="case-tab active"
							data-panel="routing"
							role="tab"
							aria-selected="true"
							tabindex="0"
						>
							<div className="case-tab-label">Telco</div>
							<div className="case-tab-title">Intelligent Routing</div>
						</div>
						<div
							className="case-tab"
							data-panel="analytics"
							role="tab"
							aria-selected="false"
							tabindex="0"
						>
							<div className="case-tab-label">Finance</div>
							<div className="case-tab-title">Reporting &amp; Analytics</div>
						</div>
						<div
							className="case-tab"
							data-panel="documents"
							role="tab"
							aria-selected="false"
							tabindex="0"
						>
							<div className="case-tab-label">Legal</div>
							<div className="case-tab-title">Document Intelligence</div>
						</div>
						<div
							className="case-tab"
							data-panel="onboarding"
							role="tab"
							aria-selected="false"
							tabindex="0"
						>
							<div className="case-tab-label">HR</div>
							<div className="case-tab-title">Agentic Onboarding</div>
						</div>
					</div>
					<div className="case-display">
						<div
							className="case-panel active"
							id="panel-routing"
							role="tabpanel"
						>
							<div className="case-canvas-wrap">
								<img
									src={Telco}
									alt="Intelligent routing dashboard visualization"
								></img>
							</div>
							<div className="case-info">
								<div className="case-info-text">
									<h3>Ask Telstra — Intelligent Routing</h3>
									<p>
										Automated customer routing, identity verification, and
										complex billing resolutions. Dramatically reducing manual
										agent dependency while maintaining rigorous compliance
										standards at enterprise scale.
									</p>
								</div>
								<div className="case-metrics">
									<div className="case-metric">
										<div className="case-metric-val">2,847</div>
										<div className="case-metric-label">Active Sessions</div>
									</div>
									<div className="case-metric">
										<div className="case-metric-val">340ms</div>
										<div className="case-metric-label">
											Avg AI Response Time
										</div>
									</div>
									<div className="case-metric">
										<div className="case-metric-val">94.2%</div>
										<div className="case-metric-label">AI Resolution Rate</div>
									</div>
								</div>
							</div>
						</div>
						<div className="case-panel" id="panel-analytics" role="tabpanel">
							<div className="case-canvas-wrap">
								<img
									src={Finance}
									alt="Analytics dashboard visualization"
								></img>
							</div>
							<div className="case-info">
								<div className="case-info-text">
									<h3>Financial Reporting &amp; Analytics</h3>
									<p>
										Deploying agentic workflow orchestration for compliance
										auditing, financial reporting, and risk detection.
										Accelerating throughput while maintaining strict APRA
										regulatory alignment and full data sovereignty.
									</p>
								</div>
								<div className="case-metrics">
									<div className="case-metric">
										<div className="case-metric-val">$4.2M</div>
										<div className="case-metric-label">Savings YTD</div>
									</div>
									<div className="case-metric">
										<div className="case-metric-val">87%</div>
										<div className="case-metric-label">AI Accuracy</div>
									</div>
									<div className="case-metric">
										<div className="case-metric-val">12ms</div>
										<div className="case-metric-label">Latency P95</div>
									</div>
								</div>
							</div>
						</div>
						<div className="case-panel" id="panel-documents" role="tabpanel">
							<div className="case-canvas-wrap">
								<img
									src={Legal}
									alt="Document intelligence pipeline visualization"
								></img>
							</div>
							<div className="case-info">
								<div className="case-info-text">
									<h3>Document Intelligence Pipeline</h3>
									<p>
										End-to-end agentic document processing from ingestion to
										audit trail. AI agents classify, extract, validate, and
										store sensitive documents with full traceability and zero
										human bottlenecks.
									</p>
								</div>
								<div className="case-metrics">
									<div className="case-metric">
										<div className="case-metric-val">7</div>
										<div className="case-metric-label">
											Pipeline Stages Automated
										</div>
									</div>
									<div className="case-metric">
										<div className="case-metric-val">100%</div>
										<div className="case-metric-label">Audit Traceability</div>
									</div>
									<div className="case-metric">
										<div className="case-metric-val">60%</div>
										<div className="case-metric-label">Faster Processing</div>
									</div>
								</div>
							</div>
						</div>
						<div className="case-panel" id="panel-onboarding" role="tabpanel">
							<div className="case-canvas-wrap">
								<img
									src={HR}
									alt="Agentic onboarding workflow visualization"
								></img>
							</div>
							<div className="case-info">
								<div className="case-info-text">
									<h3>Agentic Employee Onboarding</h3>
									<p>
										Fully automated onboarding using coordinated AI agents
										across M365, HR, IT, and training systems. From form
										submission to Day 1 readiness — zero manual intervention
										required.
									</p>
								</div>
								<div className="case-metrics">
									<div className="case-metric">
										<div className="case-metric-val">5</div>
										<div className="case-metric-label">
											Onboarding Stages Automated
										</div>
									</div>
									<div className="case-metric">
										<div className="case-metric-val">3</div>
										<div className="case-metric-label">
											AI Agents Coordinated
										</div>
									</div>
									<div className="case-metric">
										<div className="case-metric-val">0</div>
										<div className="case-metric-label">
											Manual Steps Required
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CaseStudies;
