import { useEffect, useRef } from "react";

const OrbitalRingsCanvas = ({ className }) => {
	const canvasRef = useRef(null);
	const animationRef = useRef();
	const observerRef = useRef(null);
	const pausedRef = useRef(false);

	useEffect(() => {
		const c = canvasRef.current;
		if (!c) return;
		const ctx = c.getContext("2d");
		if (!ctx) return;

		let t = 0;
		const rings = [];
		const particles = [];
		const RING_COUNT = 5;
		const PARTICLE_COUNT = 120;

		const W = () => c.offsetWidth;
		const H = () => c.offsetHeight;

		function initElements() {
			rings.length = 0;
			particles.length = 0;
			const cx = W() * 0.48;
			const cy = H() * 0.48;
			const maxR = Math.min(W(), H()) * 0.42;

			for (let i = 0; i < RING_COUNT; i++) {
				rings.push({
					radius: maxR * (0.25 + i * 0.18),
					tilt: 0.15 + i * 0.08,
					rotSpeed: (0.0004 + i * 0.00015) * (i % 2 === 0 ? 1 : -1),
					opacity: 0.04 + (RING_COUNT - i) * 0.015,
					dashOffset: Math.random() * 100,
				});
			}

			for (let i = 0; i < PARTICLE_COUNT; i++) {
				const angle = Math.random() * Math.PI * 2;
				const ringIdx = Math.floor(Math.random() * RING_COUNT);
				const r = rings[ringIdx].radius + (Math.random() - 0.5) * 30;
				particles.push({
					angle,
					radius: r,
					tilt: rings[ringIdx].tilt,
					speed: rings[ringIdx].rotSpeed * (0.8 + Math.random() * 0.4),
					size: 0.5 + Math.random() * 1.5,
					glow: Math.random() < 0.15,
					opacity: 0.2 + Math.random() * 0.5,
				});
			}
		}

		function resize() {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			c.width = c.offsetWidth * dpr;
			c.height = c.offsetHeight * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			initElements();
		}

		function draw() {
			if (pausedRef.current) {
				animationRef.current = requestAnimationFrame(draw);
				return;
			}

			const w = W();
			const h = H();
			ctx.clearRect(0, 0, w, h);
			t += 1;

			const heroMouseX = window.heroMouseX || 0.5;
			const heroMouseY = window.heroMouseY || 0.5;

			const cx = w * 0.48 + (heroMouseX - 0.5) * 20;
			const cy = h * 0.48 + (heroMouseY - 0.5) * 15;

			// sparse grid
			ctx.strokeStyle = "rgba(255,255,255,0.018)";
			ctx.lineWidth = 0.4;
			for (let x = 0; x < w; x += 72) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, h);
				ctx.stroke();
			}
			for (let y = 0; y < h; y += 72) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(w, y);
				ctx.stroke();
			}

			// central glow
			const coreGrad = ctx.createRadialGradient(
				cx,
				cy,
				0,
				cx,
				cy,
				Math.min(w, h) * 0.18,
			);
			coreGrad.addColorStop(0, "rgba(61,90,254,0.08)");
			coreGrad.addColorStop(0.5, "rgba(61,90,254,0.02)");
			coreGrad.addColorStop(1, "rgba(61,90,254,0)");
			ctx.beginPath();
			ctx.arc(cx, cy, Math.min(w, h) * 0.18, 0, Math.PI * 2);
			ctx.fillStyle = coreGrad;
			ctx.fill();

			// core point
			ctx.beginPath();
			ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
			ctx.fillStyle = "rgba(255,255,255,0.7)";
			ctx.fill();

			// rings
			rings.forEach((ring, idx) => {
				const phase = t * ring.rotSpeed;
				ctx.save();
				ctx.translate(cx, cy);

				ctx.beginPath();
				ctx.ellipse(
					0,
					0,
					ring.radius,
					ring.radius * ring.tilt,
					phase * 40,
					0,
					Math.PI * 2,
				);
				ctx.strokeStyle = `rgba(255,255,255,${ring.opacity})`;
				ctx.lineWidth = 0.6;
				ctx.setLineDash([4, 12 + idx * 4]);
				ctx.lineDashOffset = t * (idx % 2 === 0 ? 0.3 : -0.3);
				ctx.stroke();
				ctx.setLineDash([]);

				ctx.beginPath();
				ctx.ellipse(
					0,
					0,
					ring.radius,
					ring.radius * ring.tilt,
					phase * 40,
					0,
					Math.PI * 2,
				);
				ctx.strokeStyle = `rgba(61,90,254,${ring.opacity * 0.3})`;
				ctx.lineWidth = 1.5;
				ctx.stroke();

				ctx.restore();
			});

			// particles
			particles.forEach((p) => {
				p.angle += p.speed;
				const px = cx + Math.cos(p.angle) * p.radius;
				const py = cy + Math.sin(p.angle) * p.radius * p.tilt;

				if (p.glow) {
					const g = ctx.createRadialGradient(px, py, 0, px, py, p.size * 8);
					g.addColorStop(0, `rgba(61,90,254,${0.3 * p.opacity})`);
					g.addColorStop(1, "rgba(61,90,254,0)");
					ctx.beginPath();
					ctx.arc(px, py, p.size * 8, 0, Math.PI * 2);
					ctx.fillStyle = g;
					ctx.fill();
				}

				ctx.beginPath();
				ctx.arc(px, py, p.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
				ctx.fill();
			});

			// vector lines
			for (let i = 0; i < 28; i++) {
				const baseAngle = ((Math.PI * 2) / 28) * i;
				const angle = baseAngle + t * 0.0002;
				const progress = (t * 0.002 + i * 0.25) % 1;
				const dist = progress * Math.max(w, h) * 0.55;
				const len = 30 + i * 3;
				const fade =
					progress < 0.7 ? Math.min(1, progress * 3) : (1 - progress) / 0.3;

				ctx.beginPath();
				ctx.moveTo(
					cx + Math.cos(angle) * dist,
					cy + Math.sin(angle) * dist * 0.4,
				);
				ctx.lineTo(
					cx + Math.cos(angle) * (dist + len),
					cy + Math.sin(angle) * (dist + len) * 0.4,
				);
				ctx.strokeStyle = `rgba(255,255,255,${0.06 * fade})`;
				ctx.lineWidth = 0.6;
				ctx.stroke();
			}

			animationRef.current = requestAnimationFrame(draw);
		}

		// pause off‑screen
		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					pausedRef.current = !entry.isIntersecting;
				});
			},
			{ threshold: 0.05 },
		);
		observerRef.current.observe(c);

		resize();
		draw();
		window.addEventListener("resize", resize);

		return () => {
			window.removeEventListener("resize", resize);
			if (observerRef.current) observerRef.current.disconnect();
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={className}
			style={{
				position: "absolute",
				inset: 0,
				width: "100%",
				height: "100%",
				display: "block",
				zIndex: -1,
				background:
					"radial-gradient(circle at center, #020819 0%, #02010a 40%, #000000 100%)",
			}}
		/>
	);
};

export default OrbitalRingsCanvas;
