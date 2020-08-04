const fs = require("fs");
const path = require("path");

// filter the notesArray for the title or the text that is passed into the function
function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    // return result as input to the "get" route
    return filteredResults;
}

// filter the notesArray for the id of the note that is equal to the note that is passed into the function
function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    // return result as input to the "get" route
    return result;
}

// push the body of the note that is passed into the function (the note that is created), into the notesArray. Stringify the notesArray and write it to the db.json file
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        //to save file to JSON - null = dont edit any existing data - 2 create white space between values to make it readable
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    // return result as input to the "post" route
    return note;
}

// filter create a new array that excludes the note that was selected for deletion. Stringify the notesArray and write it to the db.json file
function deleteNote(body, notesArray) {
    const note = body;
    const toWrite = notesArray.filter(n => note.id !== n.id);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        //to save file to JSON - null = dont edit any existing data - 2 create white space between values to make it readable
        JSON.stringify({ notes: toWrite }, null, 2)
    );

    // return result as input to the "delete" route
    return note;
}
// note title and text must both be entered as strings
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    // return result as input to the "post" route
    return true;
}

//export function to be use in note routes
module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    deleteNote,
    validateNote
};