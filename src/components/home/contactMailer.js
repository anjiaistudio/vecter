import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";

const SERVICE_ID = process.env.REACT_APP_MAIL_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_MAIL_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_MAIL_PUBLIC_KEY;

const ContactForm = ({ type, email: initialEmail }) => {
	const [text, setText] = useState({
		title: "Let's talk about your AI use case",
		desc: "Have a business challenge in mind? We'll help you assess AI feasibility, define the right approach,  and build a clear path to execution — starting with the tools you already have.",
	});
	const [status, setStatus] = useState(null); // "success" | "error" | null
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		business: "",
		role: "",
		name: "",
		email: type === 0 ? initialEmail || "" : "",
		contact_number: "",
		type: "",
		message: "",
	});

	useEffect(() => {
		if (type === 0) {
			if (initialEmail) setForm((f) => ({ ...f, email: initialEmail }));
			setText({
				title: "See your AI ROI projection",
				desc: "Enter your details for a tailored assessment of your automation opportunity.",
			});
		}
		if (type === 1) {
			setForm((f) => ({ ...f, email: "" }));
			setText({
				title: "Let's talk about your AI use case",
				desc: "Have a business challenge in mind? We'll help you assess AI feasibility, define the right approach,  and build a clear path to execution — starting with the tools you already have.",
			});
		}
	}, [initialEmail, type]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setStatus(null);

		const templateParams = { ...form };

		emailjs
			.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
			.then(
				() => {
					setStatus("success");
					setForm({
						business: "",
						role: "",
						name: "",
						email: initialEmail || "",
						contact_number: "",
						type: "",
						message: "",
					});
					setTimeout(() => {
						document.getElementById("contactMailer").style.display = "none";
						setStatus(null);
					}, 3000);
				},
				() => setStatus("error"),
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
						autoPlay
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
						<h2>{text.title}</h2>
						<p className="contact-mailer-description">{text.desc}</p>
						<form onSubmit={handleSubmit} className="contact-form">
							<div className="field-grid">
								<div className="field">
									<label htmlFor="business">Business/Sector</label>
									<input
										id="business"
										type="text"
										name="business"
										value={form.business}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="field">
									<label htmlFor="role">Role/Position</label>
									<input
										id="role"
										type="text"
										name="role"
										value={form.role}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="field">
									<label htmlFor="user_name">Full Name</label>
									<input
										id="user_name"
										type="text"
										name="name"
										value={form.name}
										onChange={handleChange}
										required
									/>
								</div>

								<div className="field">
									<label htmlFor="user_email">Email Address</label>
									<input
										id="user_email"
										type="email"
										name="email"
										value={form.email}
										onChange={handleChange}
										required
									/>
								</div>
								<div className="field">
									<label htmlFor="user_phone">Contact Number</label>
									<input
										id="user_phone"
										type="text"
										name="contact_number"
										value={form.contact_number}
										onChange={handleChange}
										required
									/>
								</div>

								<div className="field">
									<label htmlFor="user_subject">Problem Summery</label>
									<input
										id="user_subject"
										type="text"
										name="type"
										value={form.type}
										onChange={handleChange}
										required
									/>
								</div>
							</div>

							<div className="field field-message ">
								<label htmlFor="message">
									What is the specific bottleneck or 'manual pain point' you
									want to address?
								</label>
								<textarea
									id="message"
									name="message"
									rows={4}
									value={form.message}
									onChange={handleChange}
									required
								/>
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
