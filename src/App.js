import {
  Banner,
  Enterprise,
  Footer,
  Header,
  Partners,
  ProblemSection,
  Process,
  Services,
  TestimonialCarousel,
} from "@components/home";

function App() {
	return (
		<div className="App">
			<Header />

			<main className="wrapper ">
				<Banner nav={false} dots={true} autoplay={true} />

				<ProblemSection />

				<Services />

				<Process />

				<Enterprise />

				<Partners />

				<TestimonialCarousel />
			</main>

			<Footer />
		</div>
	);
}

export default App;
