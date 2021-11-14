const port: number = 8080
import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';
import path from 'path';
import bcrypt from 'bcrypt';
const saltRounds: number = 10

if (!process.env.master_key) {
    console.log('You have not specified a master key hash in your environment.');
    process.exit(1);
}

const masterkey: string = process.env.master_key
dotenv.config();
let app = express();

app.use(express.json())

app.set('views', path.join(path.resolve('.'), 'views'))
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    let host: string;
    // res.append('Strict-Transport-Security', 'max-age=300; includeSubDomains; preload');
    host = `http://${req.hostname}`;
    if (port !== 80) { host = `${host}:${port}`}
    app.set('host', host);
    res.append('Referrer-Policy', 'no-referrer');
    res.append('X-Frame-Options', 'SAMEORIGIN');
    res.append('X-Content-Type-Options', 'nosniff');
    res.append('Access-Control-Allow-Origin', host);
    res.append('Access-Control-Allow-Methods', 'GET');
    res.append('Access-Control-Allow-Headers', 'Permissions-Policy, Content-Type');
    res.append('Cross-Origin-Resource-Policy', 'same-origin');
    res.append('Cross-Origin-Opener-Policy', 'same-origin');
    res.append('Cross-Origin-Embedder-Policy', 'require-corp');
    res.append('Cross-Origin-Embedder-Policy-Report-Only', 'require-corp');
    res.append('Feature-Policy', 'accelerometer \'none\'; camera \'none\'; geolocation \'none\'; gyroscope \'none\'; magnetometer \'none\'; microphone \'none\'; payment \'none\'; usb \'none\'')
    res.append('Permissions-Policy', 'accelerometer=(),camera=(),geolocation=(),gyroscope=(),magnetometer=(),microphone=(),payment=(),usb=(),interest-cohort=()');
    res.append('Content-Security-Policy-Report-Only', 'default-src \'none\';script-src \'self\' \'unsafe-inline\';connect-src \'none\';media-src \'none\';font-src \'none\';img-src \'self\';style-src \'self\' \'unsafe-inline\';object-src \'none\';worker-src \'none\';child-src \'none\';manifest-src \'self\';frame-src \'none\';form-action \'none\';base-uri \'self\';block-all-mixed-content;');
    res.append('Content-Security-Policy', 'default-src \'none\';script-src \'self\' \'unsafe-inline\';connect-src \'none\';media-src \'none\';font-src \'self\';img-src \'self\' https://api.thegreenwebfoundation.org ; style-src \'self\' \'unsafe-inline\';object-src \'none\';worker-src \'none\';child-src \'none\';manifest-src \'self\';frame-src data:;form-action \'none\';frame-ancestors \'none\';base-uri \'self\';block-all-mixed-content;');
    res.append('X-XSS-Protection', '0');
    res.append('Expect-CT', 'max-age=0');
    res.append('Origin-Agent-Cluster', '?1');
    res.append('X-Download-Options','noopen');
    res.removeHeader('X-Powered-By');
    next();
});

app.use(express.static(path.join(path.resolve('.'), 'static')));

let connection: mysql.Connection = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database
});

app.post('/upload', (req, res) => {
    if (!req.body['body'] || !req.body['master_key']) return res.sendStatus(400);
    bcrypt.compare(req.body['master_key'], masterkey, function(err, result) {
        if (err) { console.log(err); return res.sendStatus(500); }
        if (result !== true) { return res.sendStatus(403); }
    
        connection.query(`INSERT INTO posts (username, body) VALUES ('master', '${req.body['body']}')`, (error: string, results: Array<Object>) => {
            if (error) {
                console.log(error);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }); 
    });
});

app.get('/', (req, res) => {

    connection.query(`SELECT * FROM posts`, (error: string, results: Array<Object>) => {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            res.status(200).render('../views/index.ejs', {
                host: app.get('host'),
                posts: results
            });
        }
    });


});

app.get('*', (req, res) => {
    res.status(200).render(`${req.path.split('/')[1]}`, { host: app.get('host') }, function(err, data) {
        if(err) {
            console.log(err)
            res.status(404).render('../other/404'); 
        }
        else res.send(data)
    });
    return;
});

app.all('*', (req, res) => {
    res.status(405).send('405 Method Not Allowed\n\nSorry, you can\'t access our website with that method.\n\nPlease use GET to access our website, and it\'s information.\n\nWhat were you even trying to do, anyways? Come work with us and help us out: https://definityteam.com/join\n');
    return;
});

app.listen(port, () => { console.log(`Online on port ${port}`) });