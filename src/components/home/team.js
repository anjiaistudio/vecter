const Team = (props) => {
	return (
		<section id="team" aria-labelledby="team-heading">
			<div className="container">
				<div className="team-header">
					<span className="section-label">Leadership</span>
					<h2 id="team-heading">Built by Enterprise AI Veterans</h2>
					<p className="mt-1x">
						The Vecter team brings deep enterprise AI experience — not startup
						theory. We've built and run production AI systems at Australia's
						largest scale.
					</p>
				</div>
				<div className="team-layout">
					<div className="team-card">
						<div className="team-avatar">RL</div>
						<div className="team-name">Rohit Lakhotia</div>
						<div className="team-role">Co-Founder &amp; Strategy</div>
						<p>
							Ex Head of Customer and Channel AI at Telstra. One of Australia's
							leading authorities on AI automation. Creator of Ask Telstra.
							Proven track record delivering market-leading automation outcomes
							at enterprise scale.
						</p>
					</div>
					<div className="team-card">
						<div className="team-avatar">AJ</div>
						<div className="team-name">Anji J</div>
						<div className="team-role">Co-Founder &amp; Technology</div>
						<p>
							Principal Engineer, GenAI &amp; Enterprise AI Architect. Built
							production AI, identity, and automation systems serving millions
							of users within Australia's largest telecommunications
							infrastructure.
						</p>
					</div>
				</div>
				<div className="team-stats">
					<div>
						<div className="team-stat-val">10M+</div>
						<div className="team-stat-label">
							Daily sessions on systems we've built
						</div>
					</div>
					<div>
						<div className="team-stat-val">99.9%</div>
						<div className="team-stat-label">Production uptime achieved</div>
					</div>
					<div>
						<div className="team-stat-val">40%</div>
						<div className="team-stat-label">Average handle time reduction</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Team;
