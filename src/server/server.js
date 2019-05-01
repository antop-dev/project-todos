const logger = require('node-color-log');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const sqlite3 = require('./db/sqlite3');

const app = express();
app.use(morgan('combined', {
    skip: function (req, res) {
        // only log error responses
        return res.statusCode < 400;
    }
}));

app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

// router
app.use('/todo', require('./router/todo'));

// 404 not found
app.all('*', (req, res) => {
    res.status(404);
});

process.on('exit', () => {
    sqlite3.close(e => {
        if (e) {
            logger.error(e.message);
        }
        console.log('Close the database connection.');
    });
});

// Serve the files on port 3000.
module.exports = app.listen(3000, function () {
    console.log('Express listening on port 3000!\n');
});
