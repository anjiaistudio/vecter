const GetStarted = (props) => {
	return (
		<section id="get-started" aria-labelledby="cta-heading">
			<video
				autoplay
				muted
				loop
				playsInline
				className="cta-video"
				aria-hidden="true"
			>
				<source
					src="https://cdn.theintersect.ai/Intersect-cta.webm"
					type="video/webm"
				/>
			</video>
			<canvas className="cta-canvas" id="cta-c" aria-hidden="true"></canvas>
			<div className="cta-overlay" aria-hidden="true"></div>
			<div className="container cta-content">
				<span
					className="section-label"
					style={{ color: "rgba(255,255,255,0.4)" }}
				>
					Start Here
				</span>
				<h2 id="cta-heading">Let's talk about your AI use case</h2>
				<p>
					Have a business challenge in mind? We'll help you assess AI
					feasibility, define the right approach, and build a clear path to
					execution — starting with the tools you already have.
				</p>
				<a href="mailto:hello@vecter.com.au" className="btn btn-primary">
					Get in Touch →
				</a>
			</div>
		</section>
	);
};

export default GetStarted;
