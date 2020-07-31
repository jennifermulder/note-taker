//apiRoutes/index.js is being used as a central hub for all routing functions to be added to the application
const router = require('express').Router();
const noteRoutes = require('../apiRoutes/noteRoutes');

router.use(noteRoutes);

module.exports = router;