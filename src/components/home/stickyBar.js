import { useEffect } from "react";

const StickyBar = (props) => {
	useEffect(() => {
		const bar = document.getElementById("sticky-cta");
		const dismiss = document.getElementById("sticky-cta-dismiss");
		let dismissed = false;
		let heroHeight = 0;

		function updateHeroHeight() {
			const hero = document.getElementById("hero");
			heroHeight = hero ? hero.offsetHeight * 0.6 : 500;
		}

		function onScroll() {
			if (dismissed) return;
			if (window.scrollY > heroHeight) bar?.classList.add("visible");
			else bar?.classList.remove("visible");
		}

		dismiss?.addEventListener("click", () => {
			dismissed = true;
			bar?.classList.remove("visible");
		});
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", updateHeroHeight);
		return () => {
			window.removeEventListener("scroll", onScroll, { passive: true });
			window.removeEventListener("resize", updateHeroHeight);
		};
	}, []);
	return (
		<div id="sticky-cta" role="complementary" aria-label="Request assessment">
			<div className="sticky-cta-left">
				<div className="sticky-cta-badge">
					<div className="sticky-cta-badge-dot"></div>
					<span>Now Onboarding</span>
				</div>
				<div>
					<div className="sticky-cta-text">
						See exactly where AI will save you money — in 30 minutes.
					</div>
					<div className="sticky-cta-subtext">
						Free ROI assessment · No obligation · Covers your Microsoft &amp; AI
						stack
					</div>
				</div>
			</div>
			<div className="sticky-cta-right">
				<a
					href="#get-started"
					className="btn btn-primary"
					style={{ padding: "11px 24px", "font-size": "14px" }}
				>
					Book Your Free Assessment →
				</a>
				<button
					className="sticky-cta-dismiss"
					id="sticky-cta-dismiss"
					aria-label="Dismiss"
				>
					✕
				</button>
			</div>
		</div>
	);
};

export default StickyBar;
