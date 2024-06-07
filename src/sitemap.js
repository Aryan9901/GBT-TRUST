/* eslint-disable no-unused-vars */
const hostname = "http://localhost:5173/";

const urls = [
	{ url: "/", changefreq: "daily", priority: 1 },
	{ url: "/signup", changefreq: "daily", priority: 0.8 },
	{ url: "/reset/:resetToken", changefreq: "daily", priority: 0.8 },
	{ url: "/dashboard", changefreq: "daily", priority: 0.8 },
	{ url: "/profile", changefreq: "daily", priority: 0.8 },
	{ url: "/payment", changefreq: "daily", priority: 0.8 },
	{ url: "/team", changefreq: "daily", priority: 0.8 },
	{ url: "/program", changefreq: "daily", priority: 0.8 },
	{ url: "/request", changefreq: "daily", priority: 0.8 },
	{ url: "/refers", changefreq: "daily", priority: 0.8 },
	{ url: "/tree", changefreq: "daily", priority: 0.8 },
	{ url: "/epin", changefreq: "daily", priority: 0.8 },
	{ url: "/statements", changefreq: "daily", priority: 0.8 },
	{ url: "/bank/transfer", changefreq: "daily", priority: 0.8 },
	{ url: "/transfer/accept/:id", changefreq: "daily", priority: 0.8 },
	{ url: "kyc", changefreq: "daily", priority: 0.8 },
];

export { hostname, urls };
