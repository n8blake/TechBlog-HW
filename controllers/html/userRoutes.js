const router = require('express').Router();
const { User } = require('../../models');

router.get('/:id', (request, response) => {
	response.status(404).json({"message":"user not found"});
});

module.exports = router;