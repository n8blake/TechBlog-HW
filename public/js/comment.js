// show hide comments on main page
const showHideComments = (articleId) => {
	const articleComments = document.querySelector(`#article-${articleId}-comments`);
	if(articleComments.style.display == 'none'){
		articleComments.style.display = 'block';
	} else {
		articleComments.style.display = 'none';
	}
} 

// post comment

// delete comment 
