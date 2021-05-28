const router = require('express').Router();
const { User, Article, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

const articleQueryConfig = {
		attributes: [ 
			'article_id',
			'title',
			'content',
			'createdAt',
			'updatedAt'
		],
		include: [
			{ model: User ,
				attributes: [ 
					'user_name'
				]
			},
			{ model: Comment ,
				attributes: [ 
					'comment',
					'createdAt',
					'updatedAt'
				],
				include: [
					{ model: User ,
						attributes: [ 
							'user_name'
						]
					}
				]
			},
		],
		order: [['createdAt', 'ASC']]
	};

router.get('/all', async(request, response) => {
	try {
		const articles = await Article.findAll(articleQueryConfig);
		if(articles){
			response.status(200).json(articles);		
		} else {
			response.status(404).json({"message":"no articles found"});
		}
	} catch (error) {
		console.log(error);
		response.status(500).json(error);
	}
});

router.get('/:id', async(request, response) => {
	response.status(404);
});

// Post a new article
router.post('/', withAuth, async (request, response) => {
	try {
		if(!request.body.user_id){
			request.body.user_id = request.session.user_id;
		}
		Article.create(request.body).then(article => {
			if(article){
				response.redirect('/article/' + article.article_id);
				//response.status(200).json(article);
			} else {
				response.status(400);
			}
		});
	} catch (error) {
		console.error(error);
		response.status(500).json(error);
	}
});

//Update an article via PUT
router.put('/:id', withAuth, async (request, response) => {
	try {
		Article.update(request.body, {
			where: {
				article_id: request.params.id
			}
		})
		.then(async success => {
			if(success) {
				response.status(200).json(success);
			} else {
				response.status(410).json(success);
			}
		})
	} catch (error) {
		console.error(error);
		response.status(500).json(error);
	}
});

router.delete('/', withAuth, async (request, response) => {
	// delete a listing by id
	try {
		Article.destroy({where: {article_id: request.body.article_id}})
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