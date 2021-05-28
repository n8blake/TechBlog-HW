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
					'user_name'
				]
			},
			{ model: Comment ,
				attributes: [ 
					'comment_id',
					'comment',
					'created_at',
					'updated_at'
				],
				include: [
					{ model: User ,
						attributes: [ 
							'user_name'
						]
					},
				]
			},
		],
		order: [['created_at', 'DESC']]
	};

router.get('/', async (request, response) => {
	try {
		const articlesData = await Article.findAll(articleQueryConfig);
		const articles = articlesData.map((article) => article.get({ plain: true }));
		//console.log(listings);
		if(articles){
			articles.forEach(article => {
				if(article.comments){
					article.comments.forEach(comment => {
						if(comment.user.user_name == request.session.user_name){
							comment.user.users_comment = true;
						}
					});
				}
			});
		}
		response.render('home', {
			articles,
			logged_in: request.session.logged_in,
			user_name: request.session.user_name
		});

	} catch (error) {
		response.status(500).json(error);
	}

});

module.exports = router;