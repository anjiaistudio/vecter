import { useEffect, useRef } from "react";

const TopographicTerrainCanvas = ({ className }) => {
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
		const COLS = 120;
		const ROWS = 50;
		let heightMap = [];

		const W = () => c.offsetWidth;
		const H = () => c.offsetHeight;

		function noise(x, y) {
			const s1 = Math.sin(x * 0.08 + y * 0.06) * Math.cos(y * 0.04 - x * 0.03);
			const s2 = Math.sin(x * 0.15 - y * 0.12 + 3) * 0.5;
			const s3 = Math.sin(x * 0.25 + y * 0.2 + 7) * 0.25;
			return (s1 + s2 + s3) * 0.5 + 0.5;
		}

		function generateTerrain() {
			heightMap = [];
			for (let r = 0; r < ROWS; r++) {
				heightMap[r] = [];
				for (let col = 0; col < COLS; col++) {
					heightMap[r][col] = noise(col, r);
				}
			}
		}

		function resize() {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			c.width = c.offsetWidth * dpr;
			c.height = c.offsetHeight * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			generateTerrain();
		}

		function draw() {
			if (pausedRef.current) {
				animationRef.current = requestAnimationFrame(draw);
				return;
			}

			const w = W();
			const h = H();

			ctx.clearRect(0, 0, w, h);
			t += 0.008;

			const cellW = w / (COLS - 1);
			const perspective = 0.55;
			const baseY = h * 0.3;
			const terrainH = h * 0.7;
			const maxElev = 40;

			const beamX = (((t * 0.3) % 1.4) - 0.2) * w;

			// terrain rows
			for (let r = 0; r < ROWS - 1; r++) {
				const rowT = r / ROWS;
				const y0 =
					baseY +
					rowT * terrainH * perspective +
					(1 - perspective) * terrainH * rowT * rowT;
				const depthFade = 0.15 + 0.85 * rowT;

				ctx.beginPath();
				for (let col = 0; col < COLS; col++) {
					const x = col * cellW;
					const elev =
						heightMap[r][col] *
						maxElev *
						(0.3 + 0.7 * Math.sin(t + col * 0.05 + r * 0.08));
					const y = y0 - elev * (1 - rowT * 0.6);
					if (col === 0) ctx.moveTo(x, y);
					else ctx.lineTo(x, y);
				}

				const beamDist = Math.abs(r * cellW - beamX);
				const beamGlow = Math.max(0, 1 - beamDist / (w * 0.12));
				if (beamGlow > 0) {
					ctx.strokeStyle = `rgba(61,90,254,${0.35 * beamGlow * depthFade})`;
					ctx.lineWidth = 1.5;
					ctx.stroke();
				}

				ctx.strokeStyle = `rgba(255,255,255,${0.06 * depthFade})`;
				ctx.lineWidth = 0.7;
				ctx.stroke();
			}

			// vertical scan lines
			for (let col = 0; col < COLS; col += 6) {
				const x = col * cellW;
				ctx.beginPath();
				for (let r = 0; r < ROWS; r++) {
					const rowT = r / ROWS;
					const y0 =
						baseY +
						rowT * terrainH * perspective +
						(1 - perspective) * terrainH * rowT * rowT;
					const elev =
						heightMap[r][col] *
						maxElev *
						(0.3 + 0.7 * Math.sin(t + col * 0.05 + r * 0.08));
					const y = y0 - elev * (1 - rowT * 0.6);
					if (r === 0) ctx.moveTo(x, y);
					else ctx.lineTo(x, y);
				}
				ctx.strokeStyle = "rgba(255,255,255,0.025)";
				ctx.lineWidth = 0.5;
				ctx.stroke();
			}

			// scanning beam vertical glow
			const bAlpha =
				0.3 * Math.max(0, 1 - Math.abs(beamX - w * 0.5) / (w * 0.7));
			if (beamX > -50 && beamX < w + 50) {
				const grad = ctx.createLinearGradient(beamX - 60, 0, beamX + 60, 0);
				grad.addColorStop(0, "rgba(61,90,254,0)");
				grad.addColorStop(0.5, `rgba(61,90,254,${bAlpha})`);
				grad.addColorStop(1, "rgba(61,90,254,0)");
				ctx.fillStyle = grad;
				ctx.fillRect(beamX - 60, 0, 120, h);
			}

			// floating data points
			for (let r = 2; r < ROWS; r += 4) {
				for (let col = 3; col < COLS; col += 8) {
					const hv = heightMap[r][col];
					if (hv > 0.6) {
						const rowT = r / ROWS;
						const y0 =
							baseY +
							rowT * terrainH * perspective +
							(1 - perspective) * terrainH * rowT * rowT;
						const elev =
							hv * maxElev * (0.3 + 0.7 * Math.sin(t + col * 0.05 + r * 0.08));
						const x = col * cellW;
						const y = y0 - elev * (1 - rowT * 0.6);
						const breathe = 0.5 + 0.5 * Math.sin(t * 3 + col + r);
						const dp = 0.15 + 0.85 * rowT;

						ctx.beginPath();
						ctx.arc(x, y, 1.5 * dp, 0, Math.PI * 2);
						ctx.fillStyle = `rgba(255,255,255,${0.5 * dp * breathe})`;
						ctx.fill();

						const g = ctx.createRadialGradient(x, y, 0, x, y, 8 * dp);
						g.addColorStop(0, `rgba(61,90,254,${0.15 * dp * breathe})`);
						g.addColorStop(1, "rgba(61,90,254,0)");
						ctx.beginPath();
						ctx.arc(x, y, 8 * dp, 0, Math.PI * 2);
						ctx.fillStyle = g;
						ctx.fill();
					}
				}
			}

			animationRef.current = requestAnimationFrame(draw);
		}

		// IntersectionObserver to pause off‑screen
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
					"radial-gradient(circle at bottom, #020819 0%, #02010a 40%, #000000 100%)",
			}}
		/>
	);
};

export default TopographicTerrainCanvas;
