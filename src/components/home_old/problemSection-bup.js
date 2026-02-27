import { ResponsiveCarousel } from "@components/ResponsiveCarousel";
import {
	CrossSector,
	Enterprise,
	FinancialServices,
	HealthcareLogistics,
	Telecommunications,
} from "@utils/exportImages";
import { useScrollReveal } from "@utils/useScrollReveal";
const ProblemSection = (props) => {
	// import images & useScrollReveal...

	const deployItems = [
		{
			img: Telecommunications,
			label: "Telecommunications",
			title: "Intelligent Customer Routing",
			text: "40% reduction in average handle time across 10M+ daily sessions.",
		},
		{
			img: FinancialServices,
			label: "Financial Services",
			title: "Compliance Audit Automation",
			text: "3x throughput acceleration with 100% regulatory traceability.",
		},
		{
			img: HealthcareLogistics,
			label: "Healthcare & Logistics",
			title: "Secure Patient Data Triage",
			text: "60% faster processing with zero data leakage.",
		},
		{
			img: CrossSector,
			label: "Cross-Sector",
			title: "ROI Intelligence Dashboard",
			text: "Full financial visibility — track cost, ROI, and vendor performance in real time.",
		},
		{
			img: Enterprise,
			label: "Enterprise",
			title: "Agentic Workflow Orchestration",
			text: "End-to-end automation with human oversight at every critical decision.",
		},
	];

	const makeCard = (item) => (
		<div className="deploy-item" ref={useScrollReveal({ direction: "left" })}>
			<img src={item.img} alt={item.label} />
			<div className="wrapper deploy-item-desc">
				<span>{item.label}</span>
				<h3 className="wrapper">{item.title}</h3>
				<p className="wrapper">{item.text}</p>
			</div>
		</div>
	);

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
					<ResponsiveCarousel
						items={deployItems.map(makeCard)}
						desktop={3}
						tablet={2}
						mobile={1}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProblemSection;
