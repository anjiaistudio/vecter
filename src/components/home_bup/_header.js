import { useEffect, useRef } from "react";

const Header = (props) => {
	const headerRef = useRef(null);

	// Example: add/remove a class on scroll for fixed effect
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

	return (
		<header ref={headerRef} className="wrapper floating_header">
			<div className="header_inner">
				<div className="wrapper header_content">
					<a href="/" className="logo">
						<img
							src={`${process.env.PUBLIC_URL}/vecter-white.png`}
							alt="Vecter"
						/>
						VECTER
					</a>
					<div className="nav-links">
						<a href="#services">Services</a>
						<a href="#industries">Industries</a>
						<a href="#governance">Governance</a>
						<a href="#about">About</a>
						<a href="#contact" className="cnt-btn">
							Get In Touch
						</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
