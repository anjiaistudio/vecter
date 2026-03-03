const Statement = (props) => {
	return (
		<section id="statement" aria-labelledby="statement-heading">
			<div className="container">
				<div className="statement-inner">
					<span className="section-label">Our Philosophy</span>
					<h2 id="statement-heading">Practical AI for Real-World Teams</h2>
					<p>
						We identify high-leverage workflows, prototype fast, then scale what
						proves ROI. AI agents that work alongside your people — not against
						them. Whether you're deep in the Microsoft ecosystem or running
						multi-platform infrastructure, we start with what you already have.
					</p>
					<div
						style={{
							display: "flex",
							gap: "32px",
							"justify-content": "center",
							"flex-wrap": "wrap",
							"margin-top": "40px",
						}}
					>
						<div
							style={{ display: "flex", "align-items": "center", gap: "10px" }}
						>
							<div
								style={{
									width: "8px",
									height: "8px",
									background: "var(--accent)",
									borderRadius: "50%",
								}}
							></div>
							<span
								style={{
									fontSize: "14px",
									color: "var(--muted)",
									fontWeight: "500",
								}}
							>
								Microsoft 365 &amp; Copilot native
							</span>
						</div>
						<div
							style={{ display: "flex", "align-items": "center", gap: "10px" }}
						>
							<div
								style={{
									width: "8px",
									height: "8px",
									background: "var(--accent)",
									borderRadius: "50%",
								}}
							></div>
							<span
								style={{
									fontSize: "14px",
									color: "var(--muted)",
									fontWeight: "500",
								}}
							>
								Power Automate &amp; Power BI integrated
							</span>
						</div>
						<div
							style={{ display: "flex", "align-items": "center", gap: "10px" }}
						>
							<div
								style={{
									width: "8px",
									height: "8px",
									background: "var(--accent)",
									borderRadius: "50%",
								}}
							></div>
							<span
								style={{
									fontSize: "14px",
									color: "var(--muted)",
									fontWeight: "500",
								}}
							>
								Multi-platform AI: Anthropic · OpenAI · Azure
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Statement;
