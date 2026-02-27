import {
	Capabilities,
	CaseStudies,
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

function App() {
	return (
		<div className="App">
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
			</main>
			<Footer />
		</div>
	);
}

export default App;
