const path = require('path');
const router = require('express').Router();

//root route of the server(create homepage). This gets index.html to be served by the Express.js server
router.get('/', (req, res) => {
    //respond with an html page to display in the browser. Input directory(tell where to find the file)
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
// note page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

module.exports = router;