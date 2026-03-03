import {
	CrossSector,
	Enterprise,
	FinancialServices,
	HealthcareLogistics,
	Telecommunications,
} from "@utils/exportImages";
import { useScrollReveal } from "@utils/useScrollReveal";
const ProblemSection = (props) => {
	return (
		<div className="wrapper deploys-section dark-bg">
			<div className="container">
				<div className="wrapper">
					<div
						className="wrapper title"
						ref={useScrollReveal({ direction: "top" })}
					>
						<h6 className="wrapper">What Vecter Deploys</h6>
						<h2 className="wrapper">
							See AI in Action Across Enterprise Operations.
						</h2>
						<h5 className="wrapper">
							Real interfaces. Real workflows. Real results.
						</h5>
					</div>
					<div className="wrapper deploy-grid">
						<div
							className="deploy-item"
							ref={useScrollReveal({ direction: "left" })}
						>
							<img src={Telecommunications} alt="Telecommunications" />
							<div className="wrapper deploy-item-desc">
								<span>Telecommunications</span>
								<h3 className="wrapper">Intelligent Customer Routing</h3>
								<p className="wrapper">
									40% reduction in average handle time across 10M+ daily
									sessions.
								</p>
							</div>
						</div>
						<div
							className="deploy-item"
							ref={useScrollReveal({ direction: "left" })}
						>
							<img src={FinancialServices} alt="Financial Services" />
							<div className="wrapper deploy-item-desc">
								<span>Financial Services</span>
								<h3 className="wrapper">Compliance Audit Automation</h3>
								<p className="wrapper">
									3x throughput acceleration with 100% regulatory traceability.
								</p>
							</div>
						</div>
						<div
							className="deploy-item"
							ref={useScrollReveal({ direction: "left" })}
						>
							<img src={HealthcareLogistics} alt="Healthcare & Logistics" />
							<div className="wrapper deploy-item-desc">
								<span>Healthcare & Logistics</span>
								<h3 className="wrapper">Secure Patient Data Triage</h3>
								<p className="wrapper">
									60% faster processing with zero data leakage.
								</p>
							</div>
						</div>
						<div
							className="deploy-item"
							ref={useScrollReveal({ direction: "left" })}
						>
							<img src={CrossSector} alt="Cross Sector" />
							<div className="wrapper deploy-item-desc">
								<span>Cross-Sector</span>
								<h3 className="wrapper">ROI Intelligence Dashboard</h3>
								<p className="wrapper">
									Full financial visibility — track cost, ROI, and vendor
									performance in real time.
								</p>
							</div>
						</div>
						<div
							className="deploy-item"
							ref={useScrollReveal({ direction: "left" })}
						>
							<img src={Enterprise} alt="Enterprise" />
							<div className="wrapper deploy-item-desc">
								<span>Enterprise</span>
								<h3 className="wrapper">Agentic Workflow Orchestration</h3>
								<p className="wrapper">
									End-to-end automation with human oversight at every critical
									decision.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProblemSection;
