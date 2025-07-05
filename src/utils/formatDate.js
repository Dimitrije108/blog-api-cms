// Reformat the date
export default function formatDate(dateString) {
	const date = new Date(dateString);
	const formatted = date.toLocaleDateString("en-GB", {
		hour: '2-digit',
  	minute: '2-digit',
	});

	return formatted;
};
