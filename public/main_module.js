// ===================== NAV SCROLL =====================
(function () {
	const nav = document.getElementById("main-nav");
	const onScroll = () => {
		if (window.scrollY > 60) nav?.classList.add("scrolled");
		else nav?.classList.remove("scrolled");
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	onScroll();
})();

// ===================== STICKY CTA BAR =====================
(function () {
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
	updateHeroHeight();
	onScroll();
})();

// ===================== MOBILE MENU =====================
function closeMobileMenu() {
	document.getElementById("mobile-menu").classList.remove("open");
}
document.getElementById("hamburger")?.addEventListener("click", () => {
	document.getElementById("mobile-menu")?.classList.toggle("open");
});
document
	.getElementById("mobile-menu-close")
	?.addEventListener("click", closeMobileMenu);

// ===================== CASE STUDY TABS =====================
(function () {
	const tabs = document.querySelectorAll(".case-tab");
	tabs?.forEach((tab) => {
		tab.addEventListener("click", () => {
			tabs.forEach((t) => {
				t.classList.remove("active");
				t.setAttribute("aria-selected", "false");
			});
			tab.classList.add("active");
			tab.setAttribute("aria-selected", "true");
			document
				.querySelectorAll(".case-panel")
				.forEach((p) => p.classList.remove("active"));
			const panelId = "panel-" + tab.dataset.panel;
			const panel = document.getElementById(panelId);
			if (panel) panel.classList.add("active");
			// Draw canvas for active panel
			const canvasId = "canvas-" + tab.dataset.panel;
			drawDashboard(canvasId, tab.dataset.panel);
		});
	});
})();

// ===================== SECTOR TABS =====================
(function () {
	const tabs = document.querySelectorAll(".sector-tab");
	tabs?.forEach((tab) => {
		tab.addEventListener("click", () => {
			tabs.forEach((t) => {
				t.classList.remove("active");
				t.setAttribute("aria-selected", "false");
			});
			tab.classList.add("active");
			tab.setAttribute("aria-selected", "true");
			document
				.querySelectorAll(".sector-panel")
				.forEach((p) => p.classList.remove("active"));
			const panelId = "sector-" + tab.dataset.sector;
			const panel = document.getElementById(panelId);
			if (panel) panel.classList.add("active");
		});
	});
})();

// ===================== SCROLL FADE IN =====================
(function () {
	const els = document.querySelectorAll(".fade-in");
	const obs = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("visible");
					obs.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.1 },
	);
	els?.forEach((el) => obs.observe(el));
})();

// ===================== VIDEO FALLBACK =====================
function setupVideoFallback(videoEl, canvasEl, initFn) {
	let started = false;
	videoEl?.addEventListener("playing", () => {
		started = true;
	});
	videoEl?.addEventListener("error", () => {
		videoEl.style.display = "none";
		canvasEl.style.display = "block";
		initFn();
	});
	setTimeout(() => {
		if (!started) {
			if (!videoEl) return;
			videoEl?.style?.display = "none";
			canvasEl?.style?.display = "block";
			initFn();
		}
	}, 3000);
}

// ===================== HERO CANVAS (3D Particle Network) =====================
function initHeroCanvas() {
	const canvas = document.getElementById("hero-c");
	if (!canvas) return;
	const ctx = canvas?.getContext("2d");
	const dpr = Math.min(devicePixelRatio || 1, 2);
	let W,
		H,
		particles,
		mouse = { x: 0, y: 0 };
	let animId;

	function resize() {
		W = canvas.offsetWidth;
		H = canvas.offsetHeight;
		canvas.width = W * dpr;
		canvas.height = H * dpr;
		ctx.scale(dpr, dpr);
		initParticles();
	}

	function initParticles() {
		const count = Math.floor((W * H) / 8000);
		particles = Array.from({ length: count }, () => ({
			x: Math.random() * W,
			y: Math.random() * H,
			vx: (Math.random() - 0.5) * 0.4,
			vy: (Math.random() - 0.5) * 0.4,
			r: Math.random() * 2 + 1,
			depth: Math.random(),
		}));
	}

	function draw() {
		ctx.clearRect(0, 0, W, H);
		// Background gradient
		const grad = ctx.createLinearGradient(0, 0, W, H);
		grad.addColorStop(0, "#0d0f1a");
		grad.addColorStop(1, "#0b0b0b");
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, W, H);

		particles.forEach((p) => {
			// Parallax with mouse
			const px = p.x + (mouse.x - W / 2) * 0.02 * p.depth;
			const py = p.y + (mouse.y - H / 2) * 0.02 * p.depth;

			// Connections
			particles.forEach((q) => {
				const dx = px - (q.x + (mouse.x - W / 2) * 0.02 * q.depth);
				const dy = py - (q.y + (mouse.y - H / 2) * 0.02 * q.depth);
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < 120) {
					ctx.beginPath();
					ctx.strokeStyle = `rgba(61,90,254,${(1 - dist / 120) * 0.25 * p.depth})`;
					ctx.lineWidth = 0.5;
					ctx.moveTo(px, py);
					ctx.lineTo(
						q.x + (mouse.x - W / 2) * 0.02 * q.depth,
						q.y + (mouse.y - H / 2) * 0.02 * q.depth,
					);
					ctx.stroke();
				}
			});

			// Dot
			ctx.beginPath();
			ctx.arc(px, py, p.r * p.depth, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(107,127,254,${0.4 + p.depth * 0.6})`;
			ctx.fill();

			// Update
			p.x += p.vx;
			p.y += p.vy;
			if (p.x < 0 || p.x > W) p.vx *= -1;
			if (p.y < 0 || p.y > H) p.vy *= -1;
		});
		animId = requestAnimationFrame(draw);
	}

	// IntersectionObserver to pause off-screen
	const heroSection = document.getElementById("hero");
	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			if (!animId) draw();
		} else {
			cancelAnimationFrame(animId);
			animId = null;
		}
	});
	observer.observe(heroSection);

	window.addEventListener(
		"mousemove",
		(e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		},
		{ passive: true },
	);
	window.addEventListener("resize", resize);
	resize();
	draw();
}

// ===================== CTA CANVAS =====================
function initCtaCanvas() {
	const canvas = document.getElementById("cta-c");
	const ctx = canvas.getContext("2d");
	const dpr = Math.min(devicePixelRatio || 1, 2);
	let W, H, animId;

	function resize() {
		W = canvas.offsetWidth;
		H = canvas.offsetHeight;
		canvas.width = W * dpr;
		canvas.height = H * dpr;
		ctx.scale(dpr, dpr);
	}

	let t = 0;
	function draw() {
		ctx.clearRect(0, 0, W, H);
		ctx.fillStyle = "#0b0b0b";
		ctx.fillRect(0, 0, W, H);

		// Flowing grid lines
		ctx.strokeStyle = "rgba(61,90,254,0.08)";
		ctx.lineWidth = 1;
		const gridSize = 48;
		for (let x = 0; x < W + gridSize; x += gridSize) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, H);
			ctx.stroke();
		}
		for (let y = 0; y < H + gridSize; y += gridSize) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(W, y);
			ctx.stroke();
		}

		// Glowing orb
		const gx = W * 0.5 + Math.sin(t * 0.003) * W * 0.2;
		const gy = H * 0.5 + Math.cos(t * 0.002) * H * 0.2;
		const radial = ctx.createRadialGradient(gx, gy, 0, gx, gy, 300);
		radial.addColorStop(0, "rgba(61,90,254,0.25)");
		radial.addColorStop(1, "rgba(61,90,254,0)");
		ctx.fillStyle = radial;
		ctx.fillRect(0, 0, W, H);

		t++;
		animId = requestAnimationFrame(draw);
	}

	const ctaSection = document.getElementById("get-started");
	const obs = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			if (!animId) draw();
		} else {
			cancelAnimationFrame(animId);
			animId = null;
		}
	});
	obs.observe(ctaSection);

	window.addEventListener("resize", resize);
	resize();
	draw();
}

// ===================== GOVERNANCE CANVAS =====================
function initGovernanceCanvas() {
	const canvas = document.getElementById("governance-canvas");
	const ctx = canvas.getContext("2d");
	const dpr = Math.min(devicePixelRatio || 1, 2);
	let W,
		H,
		animId,
		t = 0;

	function resize() {
		W = canvas.offsetWidth;
		H = canvas.offsetHeight;
		canvas.width = W * dpr;
		canvas.height = H * dpr;
		ctx.scale(dpr, dpr);
	}

	function draw() {
		ctx.clearRect(0, 0, W, H);
		// Subtle grid
		ctx.strokeStyle = "rgba(61,90,254,0.06)";
		ctx.lineWidth = 1;
		const gs = 60;
		for (let x = 0; x < W; x += gs) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, H);
			ctx.stroke();
		}
		for (let y = 0; y < H; y += gs) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(W, y);
			ctx.stroke();
		}
		// Moving orbs
		for (let i = 0; i < 3; i++) {
			const ox = W * (0.2 + i * 0.3) + Math.sin(t * 0.002 + i * 2) * 80;
			const oy = H * 0.5 + Math.cos(t * 0.0015 + i) * 60;
			const r = ctx.createRadialGradient(ox, oy, 0, ox, oy, 200);
			r.addColorStop(0, "rgba(61,90,254,0.1)");
			r.addColorStop(1, "rgba(61,90,254,0)");
			ctx.fillStyle = r;
			ctx.fillRect(0, 0, W, H);
		}
		t++;
		animId = requestAnimationFrame(draw);
	}

	const govSection = document.getElementById("governance");
	const obs = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			if (!animId) draw();
		} else {
			cancelAnimationFrame(animId);
			animId = null;
		}
	});
	obs.observe(govSection);

	window.addEventListener("resize", resize);
	resize();
	draw();
}

// ===================== DASHBOARD CANVAS DRAWINGS =====================
function drawDashboard(canvasId, type) {
	const wrap = document.querySelector(`#panel-${type} .case-canvas-wrap`);
	if (!wrap) return;
	const canvas = document.getElementById(canvasId);
	if (!canvas) return;
	const ctx = canvas.getContext("2d");
	const dpr = Math.min(devicePixelRatio || 1, 2);
	const W = wrap.offsetWidth || 700;
	const H = 460;
	canvas.style.width = W + "px";
	canvas.style.height = H + "px";
	canvas.width = W * dpr;
	canvas.height = H * dpr;
	ctx.scale(dpr, dpr);

	// Background
	ctx.fillStyle = "#0c1220";
	ctx.fillRect(0, 0, W, H);

	// Grid
	ctx.strokeStyle = "rgba(255,255,255,0.03)";
	ctx.lineWidth = 1;
	for (let x = 0; x < W; x += 24) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, H);
		ctx.stroke();
	}
	for (let y = 0; y < H; y += 24) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(W, y);
		ctx.stroke();
	}

	// Tablet frame
	drawTabletFrame(ctx, W, H);

	// Sidebar
	const sideW = 140;
	ctx.fillStyle = "rgba(255,255,255,0.04)";
	ctx.fillRect(0, 40, sideW, H - 40);
	ctx.strokeStyle = "rgba(255,255,255,0.06)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(sideW, 40);
	ctx.lineTo(sideW, H);
	ctx.stroke();

	const navItems = [
		"Overview",
		"Live Feed",
		"Analytics",
		"Reports",
		"Settings",
	];
	navItems.forEach((item, i) => {
		const active =
			i === (type === "analytics" ? 2 : type === "documents" ? 3 : 1);
		if (active) {
			ctx.fillStyle = "rgba(61,90,254,0.25)";
			roundRect(ctx, 8, 60 + i * 36, sideW - 16, 28, 6);
			ctx.fill();
		}
		ctx.fillStyle = active ? "#fff" : "rgba(255,255,255,0.4)";
		ctx.font = `${active ? "600" : "400"} 11px DM Sans, sans-serif`;
		ctx.fillText(item, 20, 78 + i * 36);
		// Nav dot
		ctx.fillStyle = active ? "#3d5afe" : "rgba(255,255,255,0.2)";
		ctx.beginPath();
		ctx.arc(13, 74 + i * 36, 3, 0, Math.PI * 2);
		ctx.fill();
	});

	// Content area
	const cx = sideW + 16;
	const cw = W - sideW - 32;

	// Title bar
	ctx.fillStyle = "rgba(255,255,255,0.06)";
	roundRect(ctx, cx, 52, cw, 28, 6);
	ctx.fill();
	ctx.fillStyle = "rgba(255,255,255,0.7)";
	ctx.font = "600 10px DM Sans, sans-serif";

	const titles = {
		routing: "INTELLIGENT ROUTING — LIVE",
		analytics: "REPORTING & ANALYTICS — LIVE",
		documents: "DOCUMENT INTELLIGENCE PIPELINE",
		onboarding: "AGENTIC ONBOARDING — ACTIVE",
	};
	ctx.fillText(titles[type] || "", cx + 12, 70);

	// Green dot
	ctx.fillStyle = "#22c55e";
	ctx.beginPath();
	ctx.arc(cx + cw - 14, 66, 4, 0, Math.PI * 2);
	ctx.fill();

	if (type === "routing") drawRoutingDashboard(ctx, cx, cw, H);
	else if (type === "analytics") drawAnalyticsDashboard(ctx, cx, cw, H);
	else if (type === "documents") drawDocumentsPipeline(ctx, cx, cw, H);
	else if (type === "onboarding") drawOnboardingTimeline(ctx, cx, cw, H);
}

function drawTabletFrame(ctx, W, H) {
	// Window chrome
	ctx.fillStyle = "#1a2035";
	ctx.fillRect(0, 0, W, 40);
	// Traffic lights
	const colors = ["#ff5f57", "#febc2e", "#28c840"];
	colors.forEach((c, i) => {
		ctx.fillStyle = c;
		ctx.beginPath();
		ctx.arc(16 + i * 22, 20, 6, 0, Math.PI * 2);
		ctx.fill();
	});
	// URL bar
	ctx.fillStyle = "rgba(255,255,255,0.08)";
	roundRect(ctx, 80, 11, W - 200, 18, 9);
	ctx.fill();
	ctx.fillStyle = "rgba(255,255,255,0.3)";
	ctx.font = "10px DM Sans, sans-serif";
	ctx.fillText("vecter.ai/dashboard", 92, 23);
	// Border
	ctx.strokeStyle = "rgba(255,255,255,0.08)";
	ctx.lineWidth = 1;
	ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
}

function roundRect(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.lineTo(x + w - r, y);
	ctx.quadraticCurveTo(x + w, y, x + w, y + r);
	ctx.lineTo(x + w, y + h - r);
	ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
	ctx.lineTo(x + r, y + h);
	ctx.quadraticCurveTo(x, y + h, x, y + h - r);
	ctx.lineTo(x, y + r);
	ctx.quadraticCurveTo(x, y, x + r, y);
	ctx.closePath();
}

// KPI tile helper
function kpiTile(ctx, x, y, w, h, val, label, color) {
	ctx.fillStyle = "rgba(255,255,255,0.05)";
	roundRect(ctx, x, y, w, h, 8);
	ctx.fill();
	ctx.strokeStyle = "rgba(255,255,255,0.08)";
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.fillStyle = color || "#3d5afe";
	ctx.font = "700 20px Instrument Sans, sans-serif";
	ctx.fillText(val, x + 14, y + 34);
	ctx.fillStyle = "rgba(255,255,255,0.45)";
	ctx.font = "400 10px DM Sans, sans-serif";
	ctx.fillText(label, x + 14, y + 52);
}

function drawRoutingDashboard(ctx, cx, cw, H) {
	const kpiW = (cw - 32) / 3;
	kpiTile(ctx, cx, 92, kpiW, 68, "2,847", "Active Sessions", "#3d5afe");
	kpiTile(ctx, cx + kpiW + 8, 92, kpiW, 68, "340ms", "Avg Response", "#22c55e");
	kpiTile(
		ctx,
		cx + (kpiW + 8) * 2,
		92,
		kpiW,
		68,
		"94.2%",
		"AI Resolution",
		"#f59e0b",
	);

	// Queue lanes
	ctx.fillStyle = "rgba(255,255,255,0.5)";
	ctx.font = "600 10px DM Sans, sans-serif";
	ctx.fillText("ROUTING QUEUE", cx, 180);

	const lanes = [
		{ label: "Billing", count: 142, color: "#3d5afe" },
		{ label: "Technical", count: 89, color: "#22c55e" },
		{ label: "Identity", count: 57, color: "#f59e0b" },
		{ label: "General", count: 201, color: "#8b5cf6" },
	];
	const laneW = (cw - 24) / 4;
	lanes.forEach((lane, i) => {
		const lx = cx + i * (laneW + 8);
		const ly = 190;
		ctx.fillStyle = "rgba(255,255,255,0.04)";
		roundRect(ctx, lx, ly, laneW, 80, 8);
		ctx.fill();
		ctx.strokeStyle = lane.color + "40";
		ctx.lineWidth = 1.5;
		ctx.stroke();
		ctx.fillStyle = lane.color;
		ctx.font = "700 16px Instrument Sans, sans-serif";
		ctx.fillText(lane.count, lx + 12, ly + 30);
		ctx.fillStyle = "rgba(255,255,255,0.4)";
		ctx.font = "400 10px DM Sans, sans-serif";
		ctx.fillText(lane.label, lx + 12, ly + 48);
		// Status bar
		ctx.fillStyle = lane.color + "30";
		roundRect(ctx, lx + 8, ly + 58, laneW - 16, 12, 6);
		ctx.fill();
		ctx.fillStyle = lane.color;
		roundRect(ctx, lx + 8, ly + 58, (laneW - 16) * (lane.count / 250), 12, 6);
		ctx.fill();
	});

	// Flow diagram
	ctx.fillStyle = "rgba(255,255,255,0.5)";
	ctx.font = "600 10px DM Sans, sans-serif";
	ctx.fillText("AI ROUTING FLOW", cx, 290);

	const nodes = ["Inbound", "Classify", "AI Route", "Resolve", "Confirm"];
	const nodeY = 300;
	const nodeW = (cw - (nodes.length - 1) * 20) / nodes.length;
	nodes.forEach((n, i) => {
		const nx = cx + i * (nodeW + 20);
		const active = i <= 2;
		ctx.fillStyle = active ? "#3d5afe" : "rgba(255,255,255,0.08)";
		roundRect(ctx, nx, nodeY, nodeW, 32, 8);
		ctx.fill();
		ctx.fillStyle = active ? "#fff" : "rgba(255,255,255,0.3)";
		ctx.font = "600 10px DM Sans, sans-serif";
		const textW = ctx.measureText(n).width;
		ctx.fillText(n, nx + (nodeW - textW) / 2, nodeY + 20);
		if (i < nodes.length - 1) {
			ctx.strokeStyle = active ? "#3d5afe" : "rgba(255,255,255,0.15)";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(nx + nodeW + 2, nodeY + 16);
			ctx.lineTo(nx + nodeW + 18, nodeY + 16);
			ctx.stroke();
			ctx.fillStyle = active ? "#3d5afe" : "rgba(255,255,255,0.15)";
			ctx.beginPath();
			ctx.moveTo(nx + nodeW + 18, nodeY + 12);
			ctx.lineTo(nx + nodeW + 22, nodeY + 16);
			ctx.lineTo(nx + nodeW + 18, nodeY + 20);
			ctx.fill();
		}
	});

	// Status row
	const statuses = [
		{ label: "AI Resolved", val: "94.2%", color: "#22c55e" },
		{ label: "Escalated", val: "5.8%", color: "#f59e0b" },
		{ label: "SLA Met", val: "99.1%", color: "#3d5afe" },
	];
	const stW = (cw - 16) / 3;
	statuses.forEach((s, i) => {
		const sx = cx + i * (stW + 8);
		ctx.fillStyle = s.color + "15";
		roundRect(ctx, sx, 350, stW, 40, 8);
		ctx.fill();
		ctx.strokeStyle = s.color + "40";
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.fillStyle = s.color;
		ctx.font = "700 14px Instrument Sans, sans-serif";
		ctx.fillText(s.val, sx + 12, 375);
		ctx.fillStyle = "rgba(255,255,255,0.4)";
		ctx.font = "400 9px DM Sans, sans-serif";
		ctx.fillText(s.label, sx + 12, 387);
	});
}

function drawAnalyticsDashboard(ctx, cx, cw, H) {
	const kpiW = (cw - 16) / 3;
	kpiTile(ctx, cx, 92, kpiW, 68, "$4.2M", "Savings YTD", "#22c55e");
	kpiTile(ctx, cx + kpiW + 8, 92, kpiW, 68, "87%", "AI Accuracy", "#3d5afe");
	kpiTile(
		ctx,
		cx + (kpiW + 8) * 2,
		92,
		kpiW,
		68,
		"12ms",
		"Latency P95",
		"#f59e0b",
	);

	// Line chart
	ctx.fillStyle = "rgba(255,255,255,0.5)";
	ctx.font = "600 10px DM Sans, sans-serif";
	ctx.fillText("SAVINGS TREND (12 MONTHS)", cx, 178);

	const chartX = cx;
	const chartY = 185;
	const chartW = cw;
	const chartH = 90;

	// Chart bg
	ctx.fillStyle = "rgba(255,255,255,0.02)";
	roundRect(ctx, chartX, chartY, chartW, chartH, 8);
	ctx.fill();

	// Data
	const data = [120, 180, 210, 195, 260, 290, 310, 340, 380, 420, 460, 480];
	const maxVal = 500;
	const pts = data.map((v, i) => ({
		x: chartX + 20 + (i / (data.length - 1)) * (chartW - 40),
		y: chartY + chartH - 10 - (v / maxVal) * (chartH - 20),
	}));

	// Gradient fill
	const grad = ctx.createLinearGradient(0, chartY, 0, chartY + chartH);
	grad.addColorStop(0, "rgba(61,90,254,0.25)");
	grad.addColorStop(1, "rgba(61,90,254,0)");
	ctx.beginPath();
	ctx.moveTo(pts[0].x, chartY + chartH - 10);
	pts.forEach((p) => ctx.lineTo(p.x, p.y));
	ctx.lineTo(pts[pts.length - 1].x, chartY + chartH - 10);
	ctx.closePath();
	ctx.fillStyle = grad;
	ctx.fill();

	// Line
	ctx.beginPath();
	ctx.strokeStyle = "#3d5afe";
	ctx.lineWidth = 2;
	pts.forEach((p, i) =>
		i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y),
	);
	ctx.stroke();

	// Dots on key points
	[2, 5, 8, 11].forEach((i) => {
		ctx.fillStyle = "#3d5afe";
		ctx.beginPath();
		ctx.arc(pts[i].x, pts[i].y, 3, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.arc(pts[i].x, pts[i].y, 1.5, 0, Math.PI * 2);
		ctx.fill();
	});

	// Bar chart
	ctx.fillStyle = "rgba(255,255,255,0.5)";
	ctx.font = "600 10px DM Sans, sans-serif";
	ctx.fillText("MONTHLY BREAKDOWN", cx, 290);

	const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
	const bw = (cw - 24) / 12;
	months.forEach((m, i) => {
		const bx = cx + i * bw + 4;
		const bh = (data[i] / maxVal) * 60;
		ctx.fillStyle = i === 11 ? "#3d5afe" : "rgba(61,90,254,0.4)";
		roundRect(ctx, bx, 300 + 60 - bh, bw - 4, bh, 3);
		ctx.fill();
		ctx.fillStyle = "rgba(255,255,255,0.3)";
		ctx.font = "9px DM Sans, sans-serif";
		ctx.fillText(m, bx + 2, 375);
	});

	// Sparklines row
	const spW = (cw - 16) / 3;
	const sparkLabels = ["Revenue Impact", "Cost Reduction", "Throughput"];
	sparkLabels.forEach((l, i) => {
		const sx = cx + i * (spW + 8);
		ctx.fillStyle = "rgba(255,255,255,0.03)";
		roundRect(ctx, sx, 390, spW, 38, 6);
		ctx.fill();
		ctx.fillStyle = "rgba(255,255,255,0.4)";
		ctx.font = "9px DM Sans, sans-serif";
		ctx.fillText(l, sx + 8, 405);
		// Mini sparkline
		const sparkData = Array.from(
			{ length: 8 },
			() => 0.3 + Math.random() * 0.7,
		);
		ctx.beginPath();
		ctx.strokeStyle = "#3d5afe";
		ctx.lineWidth = 1.5;
		sparkData.forEach((v, j) => {
			const px = sx + 8 + j * ((spW - 24) / 7);
			const py = 422 - v * 10;
			j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
		});
		ctx.stroke();
	});
}

function drawDocumentsPipeline(ctx, cx, cw, H) {
	ctx.fillStyle = "rgba(255,255,255,0.5)";
	ctx.font = "600 10px DM Sans, sans-serif";
	ctx.fillText("DOCUMENT INTELLIGENCE PIPELINE", cx, 105);

	const nodes = [
		{ label: "Ingest", icon: "📥", color: "#3d5afe" },
		{ label: "Classify", icon: "🏷", color: "#8b5cf6" },
		{ label: "Extract", icon: "⚗️", color: "#06b6d4" },
		{ label: "AI Agent", icon: "🤖", color: "#f59e0b", diamond: true },
		{ label: "Validate", icon: "✅", color: "#22c55e" },
		{ label: "Store", icon: "💾", color: "#3d5afe" },
		{ label: "Audit Trail", icon: "📋", color: "#ef4444" },
	];

	// Two rows: 3 top, agent middle, 3 bottom — or just horizontal flow with bends
	// Let's do a horizontal flow with the AI Agent in the center highlighted
	const nodeR = 32;
	const totalNodes = nodes.length;
	const spacing = (cw - nodeR * 2) / (totalNodes - 1);

	nodes.forEach((n, i) => {
		const nx = cx + i * spacing + nodeR;
		const ny = n.diamond ? 210 : 200;

		// Connection line
		if (i < nodes.length - 1) {
			ctx.beginPath();
			ctx.strokeStyle = `rgba(${i === 2 || i === 3 ? "245,158,11" : "61,90,254"},0.4)`;
			ctx.lineWidth = 1.5;
			ctx.setLineDash([4, 4]);
			const nx2 = cx + (i + 1) * spacing + nodeR;
			ctx.moveTo(nx + (n.diamond ? nodeR * 1.1 : nodeR), ny);
			ctx.lineTo(nx2 - nodeR, nodes[i + 1].diamond ? 210 : 200);
			ctx.stroke();
			ctx.setLineDash([]);
			// Arrow
			ctx.fillStyle = "rgba(61,90,254,0.6)";
			const ax = (nx + nodeR * 0.9 + nx2 - nodeR) / 2;
			const ay = ny;
			ctx.beginPath();
			ctx.moveTo(ax - 4, ay - 3);
			ctx.lineTo(ax + 4, ay);
			ctx.lineTo(ax - 4, ay + 3);
			ctx.fill();
		}

		// Node shape
		if (n.diamond) {
			// Diamond for AI Agent
			const s = nodeR * 1.2;
			ctx.save();
			ctx.translate(nx, ny);
			ctx.rotate(Math.PI / 4);
			ctx.fillStyle = n.color + "25";
			ctx.strokeStyle = n.color;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.rect(-s / 2, -s / 2, s, s);
			ctx.fill();
			ctx.stroke();
			ctx.restore();
			// Badge
			ctx.fillStyle = n.color;
			roundRect(ctx, nx - 22, ny + 28, 44, 16, 8);
			ctx.fill();
			ctx.fillStyle = "#fff";
			ctx.font = "700 8px DM Sans, sans-serif";
			ctx.fillText("AI AGENT", nx - 18, ny + 39);
		} else {
			ctx.fillStyle = n.color + "20";
			ctx.strokeStyle = n.color;
			ctx.lineWidth = 1.5;
			ctx.beginPath();
			ctx.arc(nx, ny, nodeR, 0, Math.PI * 2);
			ctx.fill();
			ctx.stroke();
		}

		// Icon
		ctx.font = "16px serif";
		ctx.fillText(n.icon, nx - 8, ny + 6);

		// Label
		ctx.fillStyle = "rgba(255,255,255,0.7)";
		ctx.font = "500 10px DM Sans, sans-serif";
		const lw = ctx.measureText(n.label).width;
		ctx.fillText(n.label, nx - lw / 2, ny + nodeR + 16);

		// Pulse ring on active nodes (3 & 4)
		if (i === 3 || i === 2) {
			ctx.strokeStyle = n.color + "30";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(nx, ny, nodeR + 8, 0, Math.PI * 2);
			ctx.stroke();
		}
	});

	// Data cards below
	ctx.fillStyle = "rgba(255,255,255,0.5)";
	ctx.font = "600 10px DM Sans, sans-serif";
	ctx.fillText("PIPELINE STATS", cx, 305);

	const stats = [
		{ label: "Docs Processed", val: "14,392" },
		{ label: "Classified", val: "100%" },
		{ label: "Audit Trail", val: "Complete" },
	];
	const sw = (cw - 16) / 3;
	stats.forEach((s, i) => {
		kpiTile(ctx, cx + i * (sw + 8), 315, sw, 60, s.val, s.label, "#3d5afe");
	});

	// Flow metrics
	const flows = [
		{ from: "PDF", count: 4210 },
		{ from: "DOCX", count: 7820 },
		{ from: "Email", count: 2362 },
	];
	const fw = (cw - 16) / 3;
	flows.forEach((f, i) => {
		const fx = cx + i * (fw + 8);
		ctx.fillStyle = "rgba(255,255,255,0.03)";
		roundRect(ctx, fx, 390, fw, 38, 6);
		ctx.fill();
		ctx.fillStyle = "rgba(255,255,255,0.5)";
		ctx.font = "600 11px Instrument Sans, sans-serif";
		ctx.fillText(f.from, fx + 12, 410);
		ctx.fillStyle = "rgba(255,255,255,0.3)";
		ctx.font = "10px DM Sans, sans-serif";
		ctx.fillText(f.count.toLocaleString() + " docs", fx + 12, 423);
		// Progress
		ctx.fillStyle = "rgba(61,90,254,0.15)";
		roundRect(ctx, fx + fw - 44, 400, 36, 10, 5);
		ctx.fill();
		ctx.fillStyle = "#3d5afe";
		roundRect(ctx, fx + fw - 44, 400, 36 * (f.count / 8000), 10, 5);
		ctx.fill();
	});
}

function drawOnboardingTimeline(ctx, cx, cw, H) {
	ctx.fillStyle = "rgba(255,255,255,0.5)";
	ctx.font = "600 10px DM Sans, sans-serif";
	ctx.fillText("EMPLOYEE ONBOARDING — ACTIVE", cx, 105);

	const steps = [
		{ label: "Form Submitted", status: "done", icon: "📝" },
		{ label: "Account Provisioned", status: "done", icon: "👤" },
		{ label: "AI Training Assigned", status: "active", icon: "🎓" },
		{ label: "Equipment Ordered", status: "pending", icon: "💻" },
		{ label: "Day 1 Ready", status: "pending", icon: "🎯" },
	];

	const stepW = (cw - 24) / steps.length;
	steps.forEach((s, i) => {
		const sx = cx + i * stepW + stepW / 2;
		const sy = 165;

		// Connector
		if (i > 0) {
			const statusColors = {
				done: "#22c55e",
				active: "#3d5afe",
				pending: "rgba(255,255,255,0.15)",
			};
			ctx.strokeStyle = statusColors[steps[i - 1].status];
			ctx.lineWidth = 2;
			ctx.setLineDash(s.status === "pending" ? [4, 4] : []);
			ctx.beginPath();
			ctx.moveTo(cx + (i - 1) * stepW + stepW / 2 + 18, sy);
			ctx.lineTo(sx - 18, sy);
			ctx.stroke();
			ctx.setLineDash([]);
		}

		const colors = {
			done: "#22c55e",
			active: "#3d5afe",
			pending: "rgba(255,255,255,0.15)",
		};
		const isActive = s.status === "active";

		// Glow ring for active
		if (isActive) {
			ctx.strokeStyle = "#3d5afe30";
			ctx.lineWidth = 6;
			ctx.beginPath();
			ctx.arc(sx, sy, 22, 0, Math.PI * 2);
			ctx.stroke();
		}

		// Circle
		ctx.fillStyle = colors[s.status];
		ctx.strokeStyle = colors[s.status];
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(sx, sy, 18, 0, Math.PI * 2);
		if (s.status === "pending") ctx.stroke();
		else ctx.fill();

		// Checkmark for done
		if (s.status === "done") {
			ctx.fillStyle = "#fff";
			ctx.font = "14px serif";
			ctx.fillText("✓", sx - 5, sy + 5);
		} else if (s.status === "active") {
			ctx.fillStyle = "#fff";
			ctx.font = "12px serif";
			const iw = ctx.measureText(s.icon).width;
			ctx.fillText(s.icon, sx - iw / 2 - 2, sy + 5);
		} else {
			ctx.fillStyle = "rgba(255,255,255,0.3)";
			ctx.font = "11px serif";
			ctx.fillText(s.icon, sx - 7, sy + 5);
		}

		// Label
		ctx.fillStyle = s.status === "pending" ? "rgba(255,255,255,0.3)" : "#fff";
		ctx.font = `${s.status === "done" ? "600" : "400"} 9px DM Sans, sans-serif`;
		const lw = ctx.measureText(s.label).width;
		ctx.fillText(s.label, sx - lw / 2, sy + 36);

		// Status badge
		const badgeColors = {
			done: "#22c55e",
			active: "#3d5afe",
			pending: "rgba(255,255,255,0.1)",
		};
		const badgeText = { done: "Done", active: "Active", pending: "Pending" };
		ctx.fillStyle = badgeColors[s.status];
		roundRect(ctx, sx - 18, sy + 44, 36, 14, 7);
		ctx.fill();
		ctx.fillStyle = s.status === "pending" ? "rgba(255,255,255,0.4)" : "#fff";
		ctx.font = "700 8px DM Sans, sans-serif";
		ctx.fillText(badgeText[s.status], sx - 11, sy + 54);
	});

	// Agent cards
	ctx.fillStyle = "rgba(255,255,255,0.5)";
	ctx.font = "600 10px DM Sans, sans-serif";
	ctx.fillText("COORDINATING AGENTS", cx, 250);

	const agents = [
		{
			name: "M365 Agent",
			desc: "Account provisioning & access",
			color: "#3d5afe",
			status: "running",
		},
		{
			name: "Training Agent",
			desc: "AI learning path assignment",
			color: "#8b5cf6",
			status: "active",
		},
		{
			name: "IT Agent",
			desc: "Equipment & software setup",
			color: "#06b6d4",
			status: "queued",
		},
	];
	const aw = (cw - 16) / 3;
	agents.forEach((a, i) => {
		const ax = cx + i * (aw + 8);
		ctx.fillStyle = "rgba(255,255,255,0.04)";
		roundRect(ctx, ax, 260, aw, 78, 8);
		ctx.fill();
		ctx.strokeStyle = a.color + "50";
		ctx.lineWidth = 1.5;
		ctx.stroke();

		// Agent dot
		ctx.fillStyle = a.color;
		ctx.beginPath();
		ctx.arc(ax + 14, 280, 6, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillStyle = "#fff";
		ctx.font = "600 11px Instrument Sans, sans-serif";
		ctx.fillText(a.name, ax + 26, 284);

		ctx.fillStyle = "rgba(255,255,255,0.4)";
		ctx.font = "400 9px DM Sans, sans-serif";
		ctx.fillText(a.desc, ax + 10, 300);

		const sColors = {
			running: "#22c55e",
			active: "#3d5afe",
			queued: "#f59e0b",
		};
		ctx.fillStyle = sColors[a.status] + "20";
		roundRect(ctx, ax + 10, 312, 48, 14, 7);
		ctx.fill();
		ctx.fillStyle = sColors[a.status];
		ctx.font = "700 8px DM Sans, sans-serif";
		ctx.fillText(a.status.toUpperCase(), ax + 14, 322);
	});

	// Connector lines from step 3 down to agents
	[0, 1, 2].forEach((i) => {
		const ax = cx + i * (aw + 8) + aw / 2;
		ctx.strokeStyle = agents[i].color + "30";
		ctx.lineWidth = 1;
		ctx.setLineDash([3, 3]);
		ctx.beginPath();
		// from timeline area to agent card
		ctx.moveTo(cx + (i + 1) * stepW, 210);
		ctx.lineTo(ax, 260);
		ctx.stroke();
		ctx.setLineDash([]);
	});

	// Bottom stats
	const bstats = [
		{ label: "Time to Day 1", val: "0 manual steps" },
		{ label: "Completion", val: "62% done" },
		{ label: "Est. Complete", val: "4 hrs 12 min" },
	];
	const bsw = (cw - 16) / 3;
	bstats.forEach((s, i) => {
		ctx.fillStyle = "rgba(255,255,255,0.03)";
		roundRect(ctx, cx + i * (bsw + 8), 355, bsw, 40, 6);
		ctx.fill();
		ctx.fillStyle = "#3d5afe";
		ctx.font = "700 12px Instrument Sans, sans-serif";
		ctx.fillText(s.val, cx + i * (bsw + 8) + 10, 373);
		ctx.fillStyle = "rgba(255,255,255,0.3)";
		ctx.font = "9px DM Sans, sans-serif";
		ctx.fillText(s.label, cx + i * (bsw + 8) + 10, 386);
	});

	// Progress bar
	ctx.fillStyle = "rgba(255,255,255,0.5)";
	ctx.font = "600 10px DM Sans, sans-serif";
	ctx.fillText("OVERALL PROGRESS — 62%", cx, 413);
	ctx.fillStyle = "rgba(255,255,255,0.08)";
	roundRect(ctx, cx, 420, cw, 12, 6);
	ctx.fill();
	const gradBar = ctx.createLinearGradient(cx, 0, cx + cw * 0.62, 0);
	gradBar.addColorStop(0, "#3d5afe");
	gradBar.addColorStop(1, "#6b7ffe");
	ctx.fillStyle = gradBar;
	roundRect(ctx, cx, 420, cw * 0.62, 12, 6);
	ctx.fill();
}

// ===================== INIT =====================
window.addEventListener("DOMContentLoaded", () => {
	// Setup video fallbacks
	const heroVideo = document.querySelector(".hero-video");
	const heroCanvas = document.getElementById("hero-c");
	setupVideoFallback(heroVideo, heroCanvas, initHeroCanvas);

	const ctaVideo = document.querySelector(".cta-video");
	const ctaCanvas = document.getElementById("cta-c");
	setupVideoFallback(ctaVideo, ctaCanvas, initCtaCanvas);

	// Governance canvas always runs
	initGovernanceCanvas();

	// Draw initial dashboard
	setTimeout(() => {
		drawDashboard("canvas-routing", "routing");
	}, 100);
});
