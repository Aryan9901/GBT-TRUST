export const customerHeaders = ["Serial No", "Owner Name", "Total Vehicle", "Address", "Payment Status"];

export const customerData = [
	// {
	// 	data: ["1","tstmp1012", "M.S, Subramanium", "4 Cars", "Vishakhapatnam","ongoing"],
	// },
	{
		data: ["1", "M.S, Subramanium", "4 Cars", "Vishakhapatnam"],
		status: "ongoing",
		_id: 1,
	},
	{
		data: ["2", "Ramesh Gupta", "2 Cars", "Varodra"],
		status: "pending",
		_id: 2,
	},
	{
		data: ["3", "Vishwas Patel", "6 Cars", "Mumbai"],
		status: "completed",
		_id: 3,
	},
	{
		data: ["3", "Bhavna Goel", "4 Cars", "Indore"],
		status: "ongoing",
		_id: 4,
	},
	{
		data: ["4", "Saksham Bisen", "9 Cars", "Bhopal"],
		status: "ongoing",
		_id: 5,
	},
];

export const ownerSortOptions = [
	{ value: "", label: "Sort By" },
	{ value: "Pending", label: "Pending" },
	{ value: "location", label: "Location" },
	{ value: "total", label: "Number of Cars" },
	{ value: "status", label: "Payment Status" },
];

export const vehicleHeaders = ["Serial No", "Brand Name", "Kilometers", "Rate", "Total Days", "Amount"];

export const vehicleSortOptions = [
	{ value: "", label: "Sort By" },
	{ value: "kilometers", label: "Distance Travelled" },
	{ value: "amount", label: "Amount" },
	{ value: "days", label: "Days" },
	{ value: "rate", label: "Rate" },
];

// EPIN PAGE
export const EpinSortOptions = [
	{ value: "", label: "Select year" },
	{ value: "distance", label: "2023" },
	{ value: "location", label: "2022" },
	{ value: "total", label: "2021" },
	{ value: "status", label: "2020" },
];

export const EpinHeaders = ["Transfer ID", "Name", "E-pin No", "Date", "Status"];

export const EpinData = [
	{
		data: ["G0373", "Darrell Steward", "2798", "May 24, 2020"],
		status: "Successful",
		_id: 1,
	},
	{
		data: ["G0309", "Darlene Robertson", "1374", "October 30, 2017"],
		status: "Not Delivered",
		_id: 2,
	},
	{
		data: ["G0190", "Cameron Williamson", "6025", "February 9, 2015"],
		status: "Successful",
		_id: 3,
	},
	{
		data: ["G0310", "Ester Howard", "4600", "December 9, 2012"],
		status: "Not Delivered",
		_id: 4,
	},
	{
		data: ["G0128", "Kathryn Murphy", "6690", "February 29, 2012"],
		status: "Successful",
		_id: 5,
	},
];

// Bank Transfer Page
export const bankTransferSortOptions = [
	{ value: "", label: "Select Month" },
	{ value: "distance", label: "January" },
	{ value: "location", label: "February" },
	{ value: "total", label: "March" },
	{ value: "status", label: "April" },
];

export const bankTransferHeaders = ["Transfer ID", "Name", "Amount", "Date", "Status"];
export const awardTransferHeaders = ["Transfer ID", "Name", "Amount", "Award", "Date", "Status"];

export const bankTransferData = [
	{
		data: ["G0373", "Darrell Steward", "20,0000", "May 24, 2020"],
		status: "Successful",
		_id: 1,
	},
	{
		data: ["G0309", "Darlene Robertson", "80,000", "October 30, 2017"],
		status: "Cancel",
		_id: 2,
	},
	{
		data: ["G0190", "Cameron Williamson", "12,000.00", "February 9, 2015"],
		status: "Successful",
		_id: 3,
	},
	{
		data: ["G0310", "Ester Howard", "89,900.00", "December 9, 2012"],
		status: "Not Delivered",
		_id: 4,
	},
	{
		data: ["G0128", "Kathryn Murphy", "6690", "February 29, 2012"],
		status: "Successful",
		_id: 5,
	},
];

// Our Program Page

export const programCustomerHeaders = ["Event Name", "Request By", "Request Date", "Program Date", "Budget", "Action"];

export const programCustomerData = [
	{
		data: ["For the Child Right Seminar", "Darrell Steward", "May 24, 2020", "8/16/13", "₹ 20, 000"],
		status: "Approved",
		_id: 1,
	},
	{
		data: ["Seminar For the Human", "Darlene Robertson", "October 30, 2017", "10/28/12", "₹ 80, 000"],
		status: "Pending",
		_id: 2,
	},
	{
		data: ["For the Child Right Seminar", "Darrell Steward", "May 24, 2020", "8/16/13", "₹ 20, 000"],
		status: "Approved",
		_id: 1,
	},
	{
		data: ["Seminar For the Human", "Darlene Robertson", "October 30, 2017", "10/28/12", "₹ 80, 000"],
		status: "Pending",
		_id: 2,
	},
	{
		data: ["For the Child Right Seminar", "Darrell Steward", "May 24, 2020", "8/16/13", "₹ 20, 000"],
		status: "Approved",
		_id: 1,
	},
];

// REGISTRATION
export const registrationHeader = ["ID", "First Name", "Last Name", "Mobile No.", "Email", "Action"];

export const registrationData = [
	{
		data: ["ID-0030", "Murli", "Prasad Sharma", "8472987466", "xyz@gmail.com"],
		status: "Approved",
		_id: 1,
	},
	{
		data: ["ID-0032", "Murli", "Prasad Sharma", "8472987466", "xyz@gmail.com"],
		status: "Pending",
		_id: 2,
	},
	{
		data: ["ID-0056", "Murli", "Prasad Sharma", "8472987466", "xyz@gmail.com"],
		status: "Approved",
		_id: 1,
	},
	{
		data: ["ID-0080", "Murli", "Prasad Sharma", "8472987466", "xyz@gmail.com"],
		status: "Pending",
		_id: 2,
	},
	{
		data: ["ID-0095", "Murli", "Prasad Sharma", "8472987466", "xyz@gmail.com"],
		status: "Approved",
		_id: 1,
	},
];

const owner = {
	_id: 1,
	name: "Saksham Bisen",
	phone: "7415729120",
	email: "dummyuser.car@gmail.com",
	address: "3, Ultra Apartment, Hari Shankar Joshi Road, Dahisagar",
	gstin: "BVHDE1425D",
	hsn: "BVHDE1425D",
	pan: "BVHDE1425D",
	joining: new Date().toDateString(),
	facebook: "https://www.facebook.com",
	twitter: "https://x.com",
	instagram: "https://instagram.com",
	totalKm: "2873",
	paid: 24000.0,
	pending: 36000.0,
	cars: [
		{
			brand: "Tata Nexon",
			distance: 134,
			rate: 543.0,
			days: 51,
			amount: 4443,
			_id: 101,
		},
		{
			brand: "Tata Harrier",
			distance: 134,
			rate: 1943.0,
			days: 41,
			amount: 93269,
			_id: 102,
		},
		{
			brand: "Tata Nexon",
			distance: 134,
			rate: 543.0,
			days: 51,
			amount: 4443,
			_id: 103,
		},
		{
			brand: "Tata Harrier",
			distance: 134,
			rate: 1943.0,
			days: 41,
			amount: 93269,
			_id: 104,
		},
		{
			brand: "Tata Harrier",
			distance: 134,
			rate: 1943.0,
			days: 41,
			amount: 93269,
			_id: 105,
		},
		{
			brand: "Tata Nexon",
			distance: 134,
			rate: 543.0,
			days: 51,
			amount: 4443,
			_id: 106,
		},
		{
			brand: "Tata Harrier",
			distance: 134,
			rate: 1943.0,
			days: 41,
			amount: 93269,
			_id: 107,
		},
	],
};

export { owner };
