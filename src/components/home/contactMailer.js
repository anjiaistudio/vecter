import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

const SERVICE_ID = process.env.REACT_APP_MAIL_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_MAIL_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_MAIL_PUBLIC_KEY;
// debug: ensure env values are present at build time

const ContactForm = () => {
	const formRef = useRef(null);
	const [status, setStatus] = useState(null); // "success" | "error" | null
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formRef.current) return;

		setLoading(true);
		setStatus(null);

		emailjs
			.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
			.then(
				() => {
					setStatus("success");
					formRef.current.reset();
					setTimeout(() => {
						document.getElementById("contactMailer").style.display = "none";
						setStatus(null);
					}, 3000);
				},
				() => {
					setStatus("error");
				},
			)
			.finally(() => setLoading(false));
	};

	const closeForm = () => {
		setStatus(null);
		document.getElementById("contactMailer").style.display = "none";
	};

	return (
		<div
			className="contact-mailer_bg"
			id="contactMailer"
			style={{ display: "none" }}
		>
			<div className="contact-mailer_box">
				<div className="contact-mailer">
					<video
						autoplay
						muted
						loop
						playsInline
						className="cta-video"
						aria-hidden="true"
					>
						<source
							src="https://cdn.theintersect.ai/Intersect-cta.webm"
							type="video/webm"
						/>
					</video>
					<div className="cta-overlay" aria-hidden="true"></div>
					<div className="contact-mailer-close">
						<button type="button" onClick={closeForm}>
							X
						</button>
					</div>
					<div className="contact-overlay">
						<h2>Let's talk about your AI use case</h2>
						<p className="contact-mailer-description">
							Have a business challenge in mind? We'll help you assess AI
							feasibility, define the right approach, and build a clear path to
							execution — starting with the tools you already have.
						</p>
						<form
							ref={formRef}
							onSubmit={handleSubmit}
							className="contact-form"
						>
							<div className="field-grid">
								<div className="field">
									<label htmlFor="business">Business/Sector</label>
									<input id="business" type="text" name="business" required />
								</div>
								<div className="field">
									<label htmlFor="role">Role/Position</label>
									<input id="role" type="text" name="role" required />
								</div>
								<div className="field">
									<label htmlFor="user_name">Full Name</label>
									<input id="user_name" type="text" name="name" required />
								</div>

								<div className="field">
									<label htmlFor="user_email">Email Address</label>
									<input id="user_email" type="email" name="email" required />
								</div>
								<div className="field">
									<label htmlFor="user_phone">Contact Number</label>
									<input
										id="user_phone"
										type="text"
										name="contact_number"
										required
									/>
								</div>

								<div className="field">
									<label htmlFor="user_subject">Problem Subject</label>
									<input id="user_subject" type="text" name="type" required />
								</div>
							</div>

							<div className="field field-message ">
								<label htmlFor="message">
									What is the specific bottleneck or 'manual pain point' you
									want to address?
								</label>
								<textarea id="message" name="message" rows={4} required />
							</div>

							<div className="field-btn ">
								<button
									className="btn btn-primary"
									type="submit"
									disabled={loading}
								>
									{loading ? "Sending..." : "Send Now"}
								</button>
							</div>

							{status === "success" && (
								<p className="success">Email sent successfully.</p>
							)}
							{status === "error" && (
								<p className="error">Something went wrong. Please try again.</p>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
