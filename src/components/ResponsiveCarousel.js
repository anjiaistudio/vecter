// ResponsiveCarousel.js
import { useMemo } from "react";

export function ResponsiveCarousel({
	items,
	desktop = 3,
	tablet = 2,
	mobile = 1,
	className = "",
}) {
	// Compute item width via CSS custom property
	const style = useMemo(
		() => ({
			"--items-desktop": desktop,
			"--items-tablet": tablet,
			"--items-mobile": mobile,
		}),
		[desktop, tablet, mobile],
	);

	return (
		<div className={`carousel-wrapper ${className}`} style={style}>
			<div className="carousel-track">
				{items.map((item, idx) => (
					<div className="carousel-item" key={idx}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
}
