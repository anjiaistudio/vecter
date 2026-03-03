const Hero = (props) => {
	return (
		<div className="wrapper hero">
			<video
				autoPlay
				muted
				loop
				playsInline
				className="hero-video"
				poster="https://cdn.theintersect.ai/intersect-hero.jpg"
				aria-hidden="true"
			>
				<source
					src="https://cdn.theintersect.ai/intersect-hero.webm"
					type="video/webm"
				/>
				<source
					src="https://cdn.theintersect.ai/intersect-hero.mp4"
					type="video/mp4"
				/>
			</video>
			<div className="hero-overlay"></div>
			<div className="container">
				<div className="wrapper hero-content">
					<span className="hero-tagline">discover. automate. scale</span>
					<h1 className="wrapper hero-title">
						Scale Faster.<br></br> Reduce Cost. <br></br>{" "}
						<span>Control AI Risk.</span>
					</h1>
					<p className="wrapper">
						For COOs scaling operations, CIOs securing AI adoption, CFOs
						reducing operating cost, and Heads of Ops automating execution.
						Vecter delivers governance-first AI that produces measurable ROI
						without exposing your business.
					</p>
					<div className="wrapper hero-actions">
						<a href="#" className="btn btn-highlight">
							See Your AI ROI Projection
						</a>
						<a href="#" className="btn btn-outline">
							See Services
						</a>
					</div>
				</div>
				<div className="wrapper hero-stats">
					<div>
						<div class="hero-stat-val">10M+</div>
						<div class="hero-stat-label">Daily Sessions Automated</div>
					</div>
					<div>
						<div class="hero-stat-val">99.9%</div>
						<div class="hero-stat-label">Platform Uptime</div>
					</div>
					<div>
						<div class="hero-stat-val">40%</div>
						<div class="hero-stat-label">Avg Handle Time Reduction</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
