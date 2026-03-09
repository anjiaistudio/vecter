import { useState } from "react";
const EmailCapture = (props) => {
	const [email, setEmail] = useState("");
	const openContactForm = () => {
		document.getElementById("contactMailer").style.display = "block";
	};

	return (
		<section id="email-capture" aria-labelledby="capture-heading">
			<div className="container">
				<div className="capture-inner">
					<div className="capture-text">
						<h2 id="capture-heading">See your AI ROI projection</h2>
						<p>
							Enter your details for a tailored assessment of your automation
							opportunity.
						</p>
						<div className="capture-security">
							<span>🔒</span>
							<span>Encrypted. Australian Data Sovereignty.</span>
						</div>
					</div>
					<div>
						<div className="capture-form">
							<input
								type="email"
								className="capture-input"
								placeholder="Your work email"
								aria-label="Work email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<button
								className="capture-btn"
								type="button"
								onClick={() => {
									props.saveEmail(email);
									props.formType(0);
									setEmail("");
									openContactForm();
								}}
							>
								Get Assessment
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EmailCapture;
