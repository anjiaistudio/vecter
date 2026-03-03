import { useEffect, useRef } from "react";

const CryptoNetworkCanvas = ({ className }) => {
	const canvasRef = useRef(null);
	const animationRef = useRef();
	const nodesRef = useRef([]);
	const edgesRef = useRef([]);
	const pulsesRef = useRef([]);
	const heroMouseRef = useRef({ x: 0.5, y: 0.5 });
	const observerRef = useRef(null);
	const pausedRef = useRef(false);

	const N = 70;
	const D = 200;
	const PULSE_SPEED = 0.012;

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const nodes = nodesRef.current;
		const edges = edgesRef.current;
		const pulses = pulsesRef.current;

		const W = () => canvas.offsetWidth;
		const H = () => canvas.offsetHeight;

		function resize() {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const width = canvas.offsetWidth;
			const height = canvas.offsetHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		function project(x3, y3, z3) {
			const fov = 600;
			const scale = fov / (fov + z3);
			return {
				x: W() * 0.5 + (x3 - W() * 0.5) * scale,
				y: H() * 0.5 + (y3 - H() * 0.5) * scale,
				s: scale,
			};
		}

		function init() {
			nodes.length = 0;
			edges.length = 0;
			pulses.length = 0;
			for (let i = 0; i < N; i++) {
				nodes.push({
					x: Math.random() * W(),
					y: Math.random() * H(),
					z: Math.random() * 400 - 100,
					vx: (Math.random() - 0.5) * 0.18,
					vy: (Math.random() - 0.5) * 0.18,
					vz: (Math.random() - 0.5) * 0.12,
					r: 1 + Math.random() * 2,
					glow: Math.random() < 0.25,
					pulse: Math.random() * Math.PI * 2,
				});
			}
		}

		function spawnPulse(i, j) {
			if (pulses.length > 30) return;
			pulses.push({
				from: i,
				to: j,
				t: 0,
				speed: PULSE_SPEED + Math.random() * 0.008,
			});
		}

		function draw() {
			if (pausedRef.current) {
				animationRef.current = requestAnimationFrame(draw);
				return;
			}

			ctx.clearRect(0, 0, W(), H());

			const heroMouseX = heroMouseRef.current.x;
			const heroMouseY = heroMouseRef.current.y;
			const mx = (heroMouseX - 0.5) * 30;
			const my = (heroMouseY - 0.5) * 20;

			// move nodes
			nodes.forEach((n) => {
				n.x += n.vx;
				n.y += n.vy;
				n.z += n.vz;
				if (n.x < -20 || n.x > W() + 20) n.vx *= -1;
				if (n.y < -20 || n.y > H() + 20) n.vy *= -1;
				if (n.z < -150 || n.z > 450) n.vz *= -1;
				n.pulse += 0.02;
			});

			// build edges
			edges.length = 0;
			for (let i = 0; i < N; i++) {
				for (let j = i + 1; j < N; j++) {
					const dx = nodes[i].x - nodes[j].x;
					const dy = nodes[i].y - nodes[j].y;
					const dz = nodes[i].z - nodes[j].z;
					const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
					if (dist < D) {
						edges.push({ i, j, dist });
						if (Math.random() < 0.0008) spawnPulse(i, j);
					}
				}
			}

			// edges
			edges.forEach((e) => {
				const a = nodes[e.i];
				const b = nodes[e.j];
				const pa = project(a.x + mx, a.y + my, a.z);
				const pb = project(b.x + mx, b.y + my, b.z);
				const avgDepth = (pa.s + pb.s) / 2;
				const alpha = 0.08 * (1 - e.dist / D) * avgDepth;

				ctx.beginPath();
				ctx.moveTo(pa.x, pa.y);
				ctx.lineTo(pb.x, pb.y);
				ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
				ctx.lineWidth = 0.5 * avgDepth;
				ctx.stroke();

				if (e.dist < D * 0.5) {
					ctx.strokeStyle = `rgba(61,90,254,${alpha * 0.4})`;
					ctx.lineWidth = 1.5 * avgDepth;
					ctx.stroke();
				}
			});

			// pulses
			for (let p = pulses.length - 1; p >= 0; p--) {
				const pulse = pulses[p];
				pulse.t += pulse.speed;
				if (pulse.t > 1) {
					pulses.splice(p, 1);
					continue;
				}
				const a = nodes[pulse.from];
				const b = nodes[pulse.to];
				const px = a.x + (b.x - a.x) * pulse.t;
				const py = a.y + (b.y - a.y) * pulse.t;
				const pz = a.z + (b.z - a.z) * pulse.t;
				const pp = project(px + mx, py + my, pz);
				const sz = 3 * pp.s;
				const fade =
					pulse.t < 0.2
						? pulse.t / 0.2
						: pulse.t > 0.8
							? (1 - pulse.t) / 0.2
							: 1;

				const grad = ctx.createRadialGradient(
					pp.x,
					pp.y,
					0,
					pp.x,
					pp.y,
					sz * 4,
				);
				grad.addColorStop(0, `rgba(61,90,254,${0.5 * fade})`);
				grad.addColorStop(1, "rgba(61,90,254,0)");
				ctx.beginPath();
				ctx.arc(pp.x, pp.y, sz * 4, 0, Math.PI * 2);
				ctx.fillStyle = grad;
				ctx.fill();

				ctx.beginPath();
				ctx.arc(pp.x, pp.y, sz * 0.6, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255,255,255,${0.9 * fade})`;
				ctx.fill();
			}

			// nodes
			nodes.forEach((n) => {
				const p = project(n.x + mx, n.y + my, n.z);
				const radius = n.r * p.s;

				if (n.glow) {
					const breathe = 0.6 + 0.4 * Math.sin(n.pulse);
					const glowRad = radius * 6;
					const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRad);
					grad.addColorStop(0, `rgba(61,90,254,${0.25 * breathe * p.s})`);
					grad.addColorStop(0.5, `rgba(61,90,254,${0.06 * breathe * p.s})`);
					grad.addColorStop(1, "rgba(61,90,254,0)");
					ctx.beginPath();
					ctx.arc(p.x, p.y, glowRad, 0, Math.PI * 2);
					ctx.fillStyle = grad;
					ctx.fill();
				}

				ctx.beginPath();
				ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255,255,255,${(n.glow ? 0.85 : 0.4) * p.s})`;
				ctx.fill();
			});

			animationRef.current = requestAnimationFrame(draw);
		}

		// IntersectionObserver to pause when offscreen
		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					pausedRef.current = !entry.isIntersecting;
				});
			},
			{ threshold: 0.05 },
		);
		observerRef.current.observe(canvas);

		resize();
		init();
		animationRef.current = requestAnimationFrame(draw);

		const handleResize = () => {
			resize();
			init();
		};
		window.addEventListener("resize", handleResize);

		const handleMouseMove = (e) => {
			const rect = canvas.getBoundingClientRect();
			heroMouseRef.current = {
				x: (e.clientX - rect.left) / rect.width,
				y: (e.clientY - rect.top) / rect.height,
			};
		};
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("mousemove", handleMouseMove);
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={className || "hero-canvas"}
			style={{
				position: "absolute",
				inset: 0,
				width: "100%",
				height: "100%",
				display: "block",
				zIndex: -1,
				background:
					"radial-gradient(circle at top, #020819 0%, #02010a 40%, #000000 100%)",
			}}
		/>
	);
};

export default CryptoNetworkCanvas;
