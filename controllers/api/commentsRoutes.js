const router = require('express').Router();
const { User, Article, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async(request, response) => {
	try {
		if(!request.body.user_id){
			request.body.user_id = request.session.user_id;
		}
		Comment.create(request.body).then(comment => {
			if(comment){
				response.redirect('/article/' + request.body.article_id);
			} else {
				response.status(400).json(comment);
			}
		});
	} catch (error) {
		console.error(error);
		response.status(500).json(error);
	}
});

router.delete('/', withAuth, async (request, response) => {
	// delete a listing by id
	try {
		Comment.destroy({where: {comment_id: request.body.comment_id}})
			.then((code) => {
				code === 1 ? response.status(200).json(code) : response.status(400).json(code);
			})
			.catch((error) => {
				console.log(error);
				response.status(400).json(error);
			});
	} catch (error) {
		response.status(500).json(error);
	}
});

module.exports = router;