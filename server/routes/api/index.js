const router = require('express').Router();
const authRoutes = require('./authRoutes');
const petRoutes = require('./petRoutes');
const postRoutes = require('./postRoutes');

router.use('/auth', authRoutes);
router.use('/pet', petRoutes);
router.use('/post', postRoutes);

module.exports = router;
