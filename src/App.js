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
	const [theme, setTheme] = useState(() => {
		try {
			return localStorage.getItem("theme") || "light";
		} catch (e) {
			return "light";
		}
	});

	useEffect(() => {
		// const link = ensureThemeLink();
		// link.href = theme === "dark" ? "/theme-dark.css" : "/theme-light.css";
		// try {
		// 	localStorage.setItem("theme", theme);
		// } catch (e) {}
	}, [theme]);

	const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

	return (
		<div className="App">
			{/* <button
				onClick={toggleTheme}
				aria-label="Toggle theme"
				title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
				style={{
					position: "fixed",
					right: 16,
					bottom: 16,
					zIndex: 2000,
					padding: "10px 12px",
					borderRadius: 999,
					border: "none",
					background: theme === "dark" ? "#1f1f1f" : "#fff",
					color: theme === "dark" ? "#fff" : "#111",
					boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
					cursor: "pointer",
				}}
			>
				{theme === "dark" ? "🌞" : "🌙"}
			</button> */}

			<Navigation />
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
				<EmailCapture />
				<Governance />
				<Team />
				<GetStarted />
				<ContactForm />
			</main>
			<Footer />
		</div>
	);
}

export default App;
