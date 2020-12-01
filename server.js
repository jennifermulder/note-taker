const express = require('express');
const fs = require('fs');
const path = require('path');

var dbPath = path.join(__dirname, 'db/db.json');

//if db.json does not currently exist, create dir/ dir and json
if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.join(__dirname, 'db'), { recursive: true });
    fs.writeFileSync(
        dbPath,
        //to save file to JSON - null = dont edit any existing data - 2 create white space between values to make it readable
        JSON.stringify({ notes: [] }, null, 2)
    );
}

const { notes } = require('./db/db.json');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3002;

//instantiate server(single instance of the Express.js server)
const app = express();

//middleware
app.use(express.static('public'));

//pass through these functions first
// parse incoming string or array data. parse into key/value pairings
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//listen for requests
app.listen(PORT, () => {
    console.log(`API server now on http://localhost:${PORT}`);
});