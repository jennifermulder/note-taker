const { filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes.js');
const { notes } = require('../../db/db.json');
const router = require('express').Router();

//add route. (req is an object)
router.get('/notes', (req, res) => {
    let results = notes;
    // //query takes everything after ? in host
    // console.log(req.query)
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});
//client requesting the server to accept data
router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateNotes(req.body)) {
        //user error not server error. sends status to user
        res.status(400).send('The note is not properly formatted.');
    } else {
        // add note to json file and animals array in this function
        const note = createNewNote(req.body, notess);
        res.json(note);
    }

    // // req.body is where our incoming content will be
    // console.log(req.body);
    //sends data back to client
    res.json(note);
});

module.exports = router;