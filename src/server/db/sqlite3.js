const logger = require('node-color-log');
const {Database} = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const db = new Database(':memory:', function (e) {
    if (e) {
        throw e;
    }

    logger.info('Connected to the in-memory SQLite database.');

    let sql = fs.readFileSync(path.join(__dirname, 'todos.sql'), 'utf8').toString();
    db.run(sql);
    logger.info('SQLite has been initialized.');
});

module.exports = db;
