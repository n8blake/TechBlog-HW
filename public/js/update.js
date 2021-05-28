const updateFormHandler = async (event) => {
	event.preventDefault(); 

	const title = document.querySelector('#title').value.trim();
	const content = document.querySelector('#content').value.trim();
	const article_id = document.querySelector('#article_id').value.trim();
	
	try {
		if (title && content && article_id) {
			console.log("updating article " + article_id);
			// how do I get the listing ID here...???
			const url = '/api/articles/' + article_id;
			const response = await fetch(url, {
				method: 'PUT',
				body: JSON.stringify({
					title,
					content
				}),
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
				// refresh this page....
				document.location.replace('/article/' + article_id);
			} else {
				console.log(response);
				alert('Failed to update listing');
			}
		}
	} catch (error) {
		console.log(error);
	}
	
};

const deleteListingHandler = async(event) => {
	event.preventDefault(); 
	const article_id = document.querySelector('#article_id').value.trim();
	// prompt to confirm
	// then...
	const response = await fetch('/api/articles/', {
		method: 'DELETE',
		body: JSON.stringify({
			article_id
		}),
		headers: { 'Content-Type': 'application/json' }
	});
	console.log("Deleting article " + article_id);
	if(response.ok){
		document.location.replace('/');
	} else {
		alert('Failed to delete listing');
	}
};

document.querySelector('#update-form').addEventListener('submit', updateFormHandler);
document.querySelector('#delete-article-btn').addEventListener('click', deleteListingHandler);
