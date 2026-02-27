import { useEffect, useRef } from "react";

const Navigation = (props) => {
	const headerRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!headerRef.current) return;
			if (window.scrollY > 100) {
				headerRef.current.classList.add("scrolled");
			} else {
				headerRef.current.classList.remove("scrolled");
			}
			// You can call your own function here as well
			// onHeaderScroll(window.scrollY);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleOnClick = () => {
		document.getElementById("mobile-menu")?.classList.toggle("open");
	};

	return (
		<nav
			id="main-nav"
			role="navigation"
			aria-label="Main navigation"
			ref={headerRef}
		>
			<a href="#hero" className="nav-logo" aria-label="Vecter Home">
				Vecter
			</a>
			<ul className="nav-links">
				<li className="nav-item-dropdown">
					<a href="#services">Services ▾</a>
					<div className="mega-menu" role="menu">
						<div className="mega-col">
							<h5>AI Services</h5>
							<div className="mega-item">
								<div className="mega-icon">🎯</div>
								<div>
									<div className="mega-item-title">
										AI Consulting &amp; Strategy
									</div>
									<div className="mega-item-desc">
										Identify high-ROI AI opportunities
									</div>
								</div>
							</div>
							<div className="mega-item">
								<div className="mega-icon">⚙️</div>
								<div>
									<div className="mega-item-title">
										AI Development &amp; Integration
									</div>
									<div className="mega-item-desc">
										Custom AI solutions, any platform
									</div>
								</div>
							</div>
							<div className="mega-item">
								<div className="mega-icon">🤖</div>
								<div>
									<div className="mega-item-title">Agentic Workflows</div>
									<div className="mega-item-desc">
										Autonomous AI agents for multi-step tasks
									</div>
								</div>
							</div>
							<div className="mega-item">
								<div className="mega-icon">📊</div>
								<div>
									<div className="mega-item-title">
										Data Foundations &amp; Scale
									</div>
									<div className="mega-item-desc">
										Pipelines, governance, analytics
									</div>
								</div>
							</div>
							<div className="mega-item">
								<div className="mega-icon">🎓</div>
								<div>
									<div className="mega-item-title">
										AI Onboarding &amp; Change Management
									</div>
									<div className="mega-item-desc">
										Team training, adoption support
									</div>
								</div>
							</div>
						</div>
						<div className="mega-col">
							<h5>Industries</h5>
							<div className="mega-item">
								<div className="mega-icon">🏦</div>
								<div>
									<div className="mega-item-title">Financial Services</div>
									<div className="mega-item-desc">
										Compliance, reporting, risk
									</div>
								</div>
							</div>
							<div className="mega-item">
								<div className="mega-icon">💼</div>
								<div>
									<div className="mega-item-title">Professional Services</div>
									<div className="mega-item-desc">
										Ops-heavy workflow automation
									</div>
								</div>
							</div>
							<div className="mega-item">
								<div className="mega-icon">🏗️</div>
								<div>
									<div className="mega-item-title">
										Property &amp; Construction
									</div>
									<div className="mega-item-desc">
										Approvals, tracking, coordination
									</div>
								</div>
							</div>
							<div className="mega-item">
								<div className="mega-icon">📱</div>
								<div>
									<div className="mega-item-title">Media &amp; Technology</div>
									<div className="mega-item-desc">
										Content ops, data pipelines
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>
				<li>
					<a href="#sectors">Industries</a>
				</li>
				<li>
					<a href="#governance">Governance</a>
				</li>
				<li>
					<a href="#team">About</a>
				</li>
				<li>
					<a href="#get-started" className="nav-cta">
						Get in Touch
					</a>
				</li>
			</ul>
			<div
				className="nav-hamburger"
				id="hamburger"
				aria-label="Open menu"
				role="button"
				tabIndex="0"
				onClick={handleOnClick}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</nav>
	);
};

export default Navigation;
