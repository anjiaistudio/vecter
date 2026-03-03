const path = require("path");

module.exports = {
	webpack: {
		alias: {
			"@components": path.resolve(__dirname, "src/components"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@backgrounds": path.resolve(__dirname, "src/backgrounds"),
		},
	},
};
