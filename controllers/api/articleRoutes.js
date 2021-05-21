const router = require('express').Router();
const { User, Article, Comment } = require('../../models');

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

module.exports = router;