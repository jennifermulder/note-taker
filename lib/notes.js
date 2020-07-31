const fs = require("fs");
const path = require("path");

function filterByQuery(query, notesArray) {
    //save the notes array as filtered results
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        //to save file to JSON - null = dont edit any existing data - 2 create white space between values to make it readable
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    // return finished code to post route for response
    return note;
}

// function deleteNote(body, notesArray) {
//     const note = body;
//     notesArray.push(animal);
//     fs.writeFileSync(
//         path.join(__dirname, '../db/db.json'),
//         //to save file to JSON - null = dont edit any existing data - 2 create white space between values to make it readable
//         JSON.stringify({ notes: notesArray }, null, 2)
//     );

//     // return finished code to post route for response
//     return note;
// }

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
   
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote
};