const Marquee = (props) => {
	return (
		<section id="marquee" aria-label="Technology partners">
			<p className="marquee-label">
				Platform-agnostic across all major AI ecosystems
			</p>
			<div className="marquee-wrapper">
				<div className="marquee-track" aria-hidden="true">
					<span className="marquee-item">Anthropic</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">OpenAI</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Google Gemini</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">OpenClaw</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Microsoft 365</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Azure AI</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">AWS Bedrock</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Power Automate</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Copilot</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Power BI</span>
					<span className="marquee-dot"></span>
					{/* <!-- Duplicate for seamless loop --> */}
					<span className="marquee-item">Anthropic</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">OpenAI</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Google Gemini</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">OpenClaw</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Microsoft 365</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Azure AI</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">AWS Bedrock</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Power Automate</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Copilot</span>
					<span className="marquee-dot"></span>
					<span className="marquee-item">Power BI</span>
					<span className="marquee-dot"></span>
				</div>
			</div>
		</section>
	);
};

export default Marquee;
