const { filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes.js');
const { notes } = require('../../db/db');
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
    if (!validateNote(req.body)) {
        //user error not server error. sends status to user
        res.status(400).send('The note is not properly formatted.');
    } else {
        // add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

//client requesting the server to remove data
router.delete('/notes', (req, res) => {
    notes.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the note.");
        res.status(200).send("User: "+ notes.title +" was deleted.");
      });
});

module.exports = router;