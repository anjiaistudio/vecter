import {
	Capabilities,
	CaseStudies,
	ContactForm,
	EmailCapture,
	Footer,
	GetStarted,
	Governance,
	Hero,
	Marquee,
	MobileNavigation,
	Navigation,
	Sectors,
	Services,
	Statement,
	StickyBar,
	Team,
} from "@components/home";
import { useEffect, useState } from "react";

function ensureThemeLink() {
	let link = document.getElementById("theme-stylesheet");
	if (!link) {
		link = document.createElement("link");
		link.rel = "stylesheet";
		link.id = "theme-stylesheet";
		document.head.appendChild(link);
	}
	return link;
}

function App() {
	const [email, setEmail] = useState("");
	const [type, formType] = useState(1);
	const [themeLoaded, setThemeLoaded] = useState(false);
	const [theme, setTheme] = useState(() => {
		try {
			return localStorage.getItem("theme") || "dark";
		} catch (e) {
			return "light";
		}
	});

	useEffect(() => {
		const link = ensureThemeLink();
		const href = theme === "dark" ? "/theme-dark.css" : "/theme-light.css";

		let handled = false;
		const handleLoad = () => {
			if (!handled) {
				handled = true;
				setThemeLoaded(true);
			}
		};
		const handleError = () => {
			if (!handled) {
				handled = true;
				setThemeLoaded(true);
			}
		};

		link.addEventListener("load", handleLoad);
		link.addEventListener("error", handleError);

		// If href already set to desired file, reassigning may not trigger load in some cases,
		// so set it only if different and attempt a quick cached-check otherwise.
		try {
			if (link.href && link.href.endsWith(href) && link.sheet) {
				// stylesheet already present
				setThemeLoaded(true);
			} else if (link.href !== href) {
				link.href = href;
			}
		} catch (e) {
			// ignore CORS/access errors and rely on load/error handlers
			if (link.href !== href) link.href = href;
		}

		try {
			localStorage.setItem("theme", theme);
		} catch (e) {}

		return () => {
			link.removeEventListener("load", handleLoad);
			link.removeEventListener("error", handleError);
		};
	}, [theme]);

	const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

	return (
		<div className="App">
			{/* Loader overlay shown until theme stylesheet finishes loading */}
			{!themeLoaded && (
				<div
					aria-hidden={!themeLoaded}
					style={{
						position: "fixed",
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						background: theme === "dark" ? "#0b0b0b" : "#ffffff",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 3000,
					}}
				>
					<div
						style={{
							width: 64,
							height: 64,
							borderRadius: 999,
							border: "6px solid rgba(0,0,0,0.06)",
							borderTopColor: theme === "dark" ? "#ffffff" : "#111111",
							animation: "vecter-spin 1s linear infinite",
						}}
					/>
					<style>
						{"@keyframes vecter-spin{to{transform:rotate(360deg)}}"}
					</style>
				</div>
			)}

			<Navigation setTheme={() => toggleTheme()} />
			<MobileNavigation />

			<main className="wrapper">
				<StickyBar />
				<Hero />
				<Marquee />
				<Services />
				<Statement />
				<CaseStudies />
				<Capabilities />
				<Sectors />
				<EmailCapture
					formType={(id) => formType(id)}
					saveEmail={(email) => setEmail(email)}
				/>
				<Governance />
				<Team />
				<GetStarted
					formType={(id) => formType(id)}
					saveEmail={(email) => setEmail(email)}
				/>
				<ContactForm type={type} email={email} />
			</main>
			<Footer />
		</div>
	);
}

export default App;
