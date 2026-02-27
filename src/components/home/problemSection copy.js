import { useScrollReveal } from "@utils/useScrollReveal";

const ProblemSection = (props) => {
	return (
		<div className="wrapper problem-section dark-bg">
			<div className="container">
				<div className="wrapper">
					<div
						className="problem-graphic"
						ref={useScrollReveal({ direction: "left" })}
					>
						<svg
							width="100%"
							height="320"
							viewBox="0 0 420 320"
							xmlns="http://www.w3.org/2000/svg"
						>
							{/* Background grid lines - shifted right */}
							<g stroke="#e5e5e5" strokeWidth="1">
								<line x1="80" y1="20" x2="80" y2="270" /> {/* Y-axis */}
								<line x1="80" y1="270" x2="380" y2="270" /> {/* X-axis */}
								{/* Horizontal grid */}
								<line x1="80" y1="220" x2="380" y2="220" />
								<line x1="80" y1="170" x2="380" y2="170" />
								<line x1="80" y1="120" x2="380" y2="120" />
								<line x1="80" y1="70" x2="380" y2="70" />
								{/* Vertical grid */}
								<line x1="130" y1="270" x2="130" y2="20" />
								<line x1="180" y1="270" x2="180" y2="20" />
								<line x1="230" y1="270" x2="230" y2="20" />
								<line x1="280" y1="270" x2="280" y2="20" />
								<line x1="330" y1="270" x2="330" y2="20" />
								<line x1="380" y1="270" x2="380" y2="20" />
							</g>

							{/* Data line - adjusted points to match new coordinates */}
							<polyline
								points="80,270 130,220 180,170 230,120 280,70 330,40 380,30"
								fill="none"
								stroke="#0044cc"
								strokeWidth="3"
							/>

							{/* X-axis labels (Months) */}
							<text x="80" y="290" fontSize="13" fill="#666">
								0
							</text>
							<text x="130" y="290" fontSize="13" fill="#666">
								1
							</text>
							<text x="180" y="290" fontSize="13" fill="#666">
								2
							</text>
							<text x="230" y="290" fontSize="13" fill="#666">
								3
							</text>
							<text x="280" y="290" fontSize="13" fill="#666">
								4
							</text>
							<text x="330" y="290" fontSize="13" fill="#666">
								5
							</text>
							<text x="380" y="290" fontSize="13" fill="#666">
								6 Months
							</text>

							{/* Y-axis labels (ROI %) */}
							<text x="40" y="270" fontSize="13" fill="#666" textAnchor="end">
								0%
							</text>
							<text x="40" y="220" fontSize="13" fill="#666" textAnchor="end">
								20%
							</text>
							<text x="40" y="170" fontSize="13" fill="#666" textAnchor="end">
								40%
							</text>
							<text x="40" y="120" fontSize="13" fill="#666" textAnchor="end">
								60%
							</text>
							<text x="40" y="70" fontSize="13" fill="#666" textAnchor="end">
								80%
							</text>
							<text x="40" y="30" fontSize="13" fill="#666" textAnchor="end">
								100%
							</text>

							{/* Axis titles */}
							<text
								x="200"
								y="310"
								fontSize="14"
								fill="#111"
								textAnchor="middle"
							>
								Time (Months)
							</text>
							<text
								x="15"
								y="170"
								fontSize="14"
								fill="#111"
								textAnchor="middle"
								transform="rotate(-90 15 170)"
							>
								Efficiency / ROI (%)
							</text>

							{/* Title */}
							<text
								x="210"
								y="25"
								fontSize="15"
								fill="#0044cc"
								textAnchor="middle"
							>
								Your AI Growth Trajectory
							</text>
						</svg>
					</div>

					<div
						className="problem-content"
						ref={useScrollReveal({ direction: "right" })}
					>
						<h3>Powerful AI is Useless Without Strategy and Control.</h3>
						<p>
							Open-source tools and agents demand secure environments, API
							management, and ongoing governance—especially under Australian
							regulations like the Voluntary AI Safety Standard.
						</p>
						<p>
							<strong>The Automation Delta:</strong>
							<br />
							Manual Execution: $45/hr (Human Cost)
							<br />
							Vecter Agent: $0.04/task (Compute Cost)
							<br />
							Setup Time: 24 Hours.
							<br />
							Achieve up to 497% ROI on projects, as seen in similar Australian
							implementations.
						</p>
						<p>
							We don't replace your team. We give them superpowers. Vecter
							provides the strategy, secure infrastructure, and governance you
							need for ethical, scalable AI adoption.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProblemSection;
