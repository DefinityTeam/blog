import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mysql from "mysql";

dotenv.config();
let app = express();
app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));

let connection: mysql.Connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_database
});

app.post('/upload', (req, res) => {
    if (!req.body['body'] || !req.body['master_key']) return res.send(400).send('<center><h1>400 Bad Request</h1><hr><p>blog-server</p></center>');
    if (req.body['master_key'] !== process.env.master_key) return res.send(403).send('<center><h1>403 Forbidden</h1><hr><p>blog-server</p></center>');

    connection.query(`INSERT INTO posts (username, body, time) VALUES ('master', '${req.body['body']}', ${Date.now()})`)
});

app.listen(80);