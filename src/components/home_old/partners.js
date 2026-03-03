import {
	Anthropic,
	AWS,
	LangChain,
	MicrosoftAzure,
	OpenAI,
	Pinecone,
} from "@utils/exportImages";
import { useScrollReveal } from "@utils/useScrollReveal";

const Partners = (props) => {
	return (
		<div className="wrapper trust-bar dark-bg">
			<div className="container">
				<div className="wrapper">
					<h3 className="wrapper" ref={useScrollReveal({ direction: "top" })}>
						Powered by Trusted Partners:
					</h3>
					<div className="wrapper trust-bar-card">
						<div ref={useScrollReveal({ direction: "zoomIn" })}>
							<img src={MicrosoftAzure} alt="Microsoft Azure" />
							<span>Microsoft Azure</span>
						</div>
						<div ref={useScrollReveal({ direction: "zoomIn" })}>
							<img src={OpenAI} alt="OpenAI" />
							<span>OpenAI</span>
						</div>
						<div ref={useScrollReveal({ direction: "zoomIn" })}>
							<img src={Anthropic} alt="Anthropic" />
							<span>Anthropic</span>
						</div>
						<div ref={useScrollReveal({ direction: "zoomIn" })}>
							<img src={LangChain} alt="LangChain" />
							<span>LangChain</span>
						</div>
						<div ref={useScrollReveal({ direction: "zoomIn" })}>
							<img src={Pinecone} alt="Pinecone" />
							<span>Pinecone</span>
						</div>
						<div ref={useScrollReveal({ direction: "zoomIn" })}>
							<img src={AWS} alt="AWS" />
							<span>AWS</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Partners;
