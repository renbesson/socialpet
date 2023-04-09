const router = require('express').Router();
const authRoutes = require('./authRoutes');
const petRoutes = require('./petRoutes');

router.use('/auth', authRoutes);
router.use('/pet', petRoutes);

module.exports = router;
