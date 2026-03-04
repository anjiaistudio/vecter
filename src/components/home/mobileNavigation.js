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
			<a href="#services" onClick={handleOnClick}>
				Services
			</a>
			<a href="#sectors" onClick={handleOnClick}>
				Industries
			</a>
			<a href="#governance" onClick={handleOnClick}>
				Governance
			</a>
			<a href="#team" onClick={handleOnClick}>
				About
			</a>
			<a href="#get-started" onClick={handleOnClick}>
				Get in Touch →
			</a>
		</div>
	);
};

export default MobileNavigation;
