import { SitemapStream, streamToPromise } from "sitemap";
import fsExtra from "fs-extra";

// Define the base URL for your website
const hostname = "http://localhost:5173";

// Define an array of URLs with additional metadata
const urls = [
	{
		url: "/",
		changefreq: "daily",
		priority: 1.0,
		image: {
			loc: "http://localhost:5173/public/images/login.jpg",
			title: "Login Page Image",
			caption: "This is the image for the Login page",
		},
		description:
			"This vibrant login page welcomes you to the world of GBT Trust - Ganpati Balaji Trust, your gateway to seamless access and personalized experiences. Unlock the doors to a community-driven platform designed to serve you with utmost trust and devotion. Embrace convenience, security, and empowerment every time you login.",
	},
	{
		url: "/signup",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/signup.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the sign up page",
		},
		description:
			"Join our vibrant community with ease! Sign up now and unlock exclusive benefits with a simple click. Enter your referral code to embark on a journey enriched with rewards and camaraderie. Experience the joy of seamless registration and dive into a world of opportunities. Your adventure begins here!",
	},
	{
		url: "/dashboard",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/dashboard.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the Dashboard page",
		},
		description:
			"Empower with insights on our dynamic dashboard! Explore personalized stats, vibrant community data, & collective achievements. Experience data-driven decisions & community engagement, all in one place.",
	},
	{
		url: "/profile",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/profile.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the Profile page",
		},
		description:
			"Elevate your profile! Easily customize personal details, correct discrepancies, add bank account info & DOB. Refine your digital identity for seamless community interactions. Empower yourself with control & convenience.",
	},
	{
		url: "/payment",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/payment.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the Payments page",
		},
		description: "Unlock community benefits! Join & unlock referral system eligibility with a Rs. 580 payment. Start your journey with us today!",
	},
	{
		url: "/tree",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/tree.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the Tree page",
		},
		description:
			"Visualize and navigate your referral network effortlessly with our interactive tree page! Easily track connections, identify key referrals, and expand your network with clarity and precision.",
	},
	{
		url: "/request",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/request.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the Request page",
		},
		description:
			"Initiate quick and secure fund transfers from your wallet to your bank account through our request page. Simplify financial transactions with seamless money transfers, ensuring convenience and control over your funds.",
	},
	{
		url: "/program",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/program.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the Programs page",
		},
		description:
			"Propose charity programs and impactful initiatives easily on our platform! Share ideas for meaningful projects that make a difference. Simplify suggesting charitable endeavors and impactful activities. Empower community engagement by advocating noble causes, inspiring positive change.",
	},
	{
		url: "/team",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/team.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the Team page",
		},
		description:
			"Keep tabs on your team's progress effortlessly with our Team page! Monitor achievements and growth, track milestones, and celebrate contributions. Foster collaboration and synergy among team members, driving towards shared goals and celebrating collective success.",
	},
	{
		url: "/refers",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/refers.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the Refers page",
		},
		description:
			"Effortlessly manage your referrals on our Refer page! Copy and share your referral URL via email or other channels. Track user progress to see which steps they've completed, empowering you to guide them effectively. Maximize your referral potential with ease, leveraging our user-friendly interface to expand your network and maximize rewards.",
	},
	{
		url: "/epin",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/epin.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the sign up page",
		},
		description: "Sign up to create an account on our website.",
	},
	{
		url: "/statements",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/statements.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the statements page",
		},
		description:
			"View all your transactions on our Statements page! Track credits and debits with ease, staying informed about your financial activity. Access a comprehensive overview of your transaction history, ensuring transparency and accountability. Simplify financial management and stay in control of your funds effortlessly.",
	},
	{
		url: "/bank/transfer",
		changefreq: "daily",
		priority: 0.8,
		image: {
			loc: "http://localhost:5173/public/images/bank.jpg",
			title: "Sign Up Page Image",
			caption: "This is the image for the Bank Transfer page",
		},
		description:
			"Initiate fund requests on /bank/transfer! Users can submit withdrawal requests for admin approval. Seamlessly manage requests, empowering admins to approve or deny withdrawals, ensuring smooth fund transfers. Simplify financial transactions and maintain control over fund disbursements with our streamlined process.",
	},
];

async function generateSitemap() {
	const sitemapStream = new SitemapStream({ hostname });

	urls.forEach((url) => {
		sitemapStream.write({
			url: url.url,
			changefreq: url.changefreq,
			priority: url.priority,
			img: [url.image],
			description: url.description,
		});
	});

	sitemapStream.end();

	const sitemap = await streamToPromise(sitemapStream);

	// Write sitemap to public directory
	await fsExtra.createWriteStream("./public/sitemap.xml").write(sitemap);
}

generateSitemap().then(() => console.log("Sitemap generated successfully."));
