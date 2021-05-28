const deleteComment = async(comment_id) => {
	const response = await fetch('/api/comments/', {
		method: 'DELETE',
		body: JSON.stringify({
			comment_id
		}),
		headers: { 'Content-Type': 'application/json' }
	});
	console.log("Deleting comment " + comment_id);
	if(response.ok){
		document.location.reload();;
	} else {
		alert('Failed to delete article');
	}
};
