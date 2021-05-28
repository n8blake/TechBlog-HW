// post comment
const newCommentFormHandler = async (event) => {
	event.preventDefault();
	const comment = document.querySelector('#comment').value.trim();
	const article_id = document.querySelector('#comment_article_id').value.trim();

	try {
		if(comment) {
			const url = '/api/comments/';
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					comment,
					article_id
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

// add listeners
document.querySelector('#comment-form').addEventListener('submit', newCommentFormHandler);