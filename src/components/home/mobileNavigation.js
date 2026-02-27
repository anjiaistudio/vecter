const MobileNavigation = (props) => {
	const handleOnClick = () => {
		document.getElementById("mobile-menu").classList.remove("open");
	};
	return (
		<div
			className="mobile-menu"
			id="mobile-menu"
			role="dialog"
			aria-label="Mobile navigation"
		>
			<span
				className="mobile-menu-close"
				id="mobile-menu-close"
				aria-label="Close menu"
				onClick={handleOnClick}
			>
				✕
			</span>
			<a href="#services" onClick="closeMobileMenu()">
				Services
			</a>
			<a href="#sectors" onClick="closeMobileMenu()">
				Industries
			</a>
			<a href="#governance" onClick="closeMobileMenu()">
				Governance
			</a>
			<a href="#team" onClick="closeMobileMenu()">
				About
			</a>
			<a href="#get-started" onClick="closeMobileMenu()">
				Get in Touch →
			</a>
		</div>
	);
};

export default MobileNavigation;
