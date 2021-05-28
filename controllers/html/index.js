const router = require('express').Router();

const userRoutes = require('./userRoutes');
const articleRoutes = require('./articleRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/article', articleRoutes);

module.exports = router;