const newArticleFormHandler = async (event) => {
	event.preventDefault();
	const title = document.querySelector('#title').value.trim();
	const content = document.querySelector('#content').value.trim();
	try {
		if(title && content) {
			const url = '/api/articles/';
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					title,
					content
				}),
				headers: { 'Content-Type': 'application/json' },
			});
			console.log(response);
			if (response.ok && response.url) {
				// refresh this page....
				document.location.replace(response.url);
			} else {
				console.log(response);
				alert('Failed to create article.');
			}
		}
	} catch (error) {
		console.error(error);
	}
}
document.querySelector('#new-form').addEventListener('submit', newArticleFormHandler);