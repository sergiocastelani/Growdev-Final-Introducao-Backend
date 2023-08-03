import express from 'express';
import { readFile } from 'fs';
import { userRouter } from './user/user_routes.js';
import { messageRouter } from './message/message_routes.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-requested-with');
    next()
  });


app.use(userRouter);
app.use(messageRouter);

//home route
app.get('/', (req, res) => {
    res.send(`
<html>
<head>
    <title>API Recados</title>
</head>
<h1>Hey this is my API running 🥳</h1>
<p>Download <a href="/postman_config">this Postman config file</a> to test this API</p>
</html>
    `);
});

//postman config file
app.get('/postman_config', (req, res) => {
    readFile('./postman_collection.json', 'utf8', (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(data);
    });
});

app.listen(80, function(){
    console.log('Server is running on port 80');
});
