const Hero = (props) => {
	return (
		<section id="hero" ariaLabelledby="hero-heading">
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
			<canvas className="hero-canvas" id="hero-c" aria-hidden="true"></canvas>
			<div className="hero-overlay" aria-hidden="true"></div>
			<div className="hero-content container">
				<span className="hero-tagline">discover. automate. scale</span>
				<h1 className="hero-h1" id="hero-heading">
					Scale Faster.<br></br>Reduce Cost.<br></br>
					<span>Control AI Risk.</span>
				</h1>
				<p className="hero-sub">
					For COOs scaling operations, CIOs securing AI adoption, CFOs reducing
					operating cost, and Heads of Ops automating execution. Vecter delivers
					governance-first AI that produces measurable ROI without exposing your
					business.
				</p>
				<div className="hero-ctas">
					<a href="#get-started" className="btn btn-primary">
						See Your AI ROI Projection
					</a>
					<a href="#services" className="btn btn-secondary">
						See Services
					</a>
				</div>
				<div className="hero-stats">
					<div>
						<div className="hero-stat-val">10M+</div>
						<div className="hero-stat-label">Daily Sessions Automated</div>
					</div>
					<div>
						<div className="hero-stat-val">99.9%</div>
						<div className="hero-stat-label">Platform Uptime</div>
					</div>
					<div>
						<div className="hero-stat-val">40%</div>
						<div className="hero-stat-label">Avg Handle Time Reduction</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
