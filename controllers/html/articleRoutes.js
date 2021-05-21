const router = require('express').Router();
const { User, Article, Comment } = require('../../models');

const articleQueryConfig = {
		attributes: [ 
			'article_id',
			'title',
			'content',
			'created_at',
			'updated_at'
		],
		include: [
			{ model: User ,
				attributes: [ 
					'user_name',
					'user_id'
				]
			},
			{ model: Comment ,
				attributes: [ 
					'comment',
					'created_at',
					'updated_at'
				],
				include: [
					{ model: User ,
						attributes: [ 
							'user_name',
							'user_id'
						]
					}
				]
			},
		],
		order: [['created_at', 'ASC']]
	};

router.get('/:id', async(request, response) => {
	try {
		// get a listinging by its id
		if(request.params.id) {
			const articleData = await Article.findByPk(request.params.id, articleQueryConfig).catch((error) => {
				response.json(error);
			});
			const article = articleData.get({plain: true});
			

			if(article.comments){
				article.comments.forEach(comment => {
					if(comment.user.user_name == request.session.user_name){
						comment.user.users_comment = true;
					}
				});
			}

			const users_article = (article.user.user_id == request.session.user_id);
			if(article){
				response.render('article', {
					article,
					user_id: request.session.user_id,
					user_name: request.session.user_name,
					users_article: users_article,
					logged_in: request.session.logged_in,
				});
			} else {
				response.status(404);
			}
		} else {
			response.status(404);
		}
	} catch (error) {
		console.log(error);
		response.status(500);
	}

});

module.exports = router;