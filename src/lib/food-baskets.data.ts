export const donationOptions = [
	{
		title: 'Food Basket',
		description: 'Provide essential food supplies for a family in Gaza for one week.',
		amount: 20,
		image: '/images/donations/food-basket.jpg'
	},
	{
		title: 'Dance Education',
		description: 'Support dance education and therapy programs for children.',
		amount: 50,
		image: '/images/donations/dance-education.jpg'
	},
	{
		title: 'Community Support',
		description: 'Help rebuild and maintain our community spaces and programs.',
		amount: 100,
		image: '/images/donations/community.jpg'
	}
];

export const handleDonation = (option: any) => {
	// Handle donation process
	console.log('Processing donation:', option);
};
