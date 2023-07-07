import express from 'express';
import { readFile } from 'fs';
import userRoutesConfig from './user/user_routes.js';
import messageRoutesConfig from './message/message_routes.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

userRoutesConfig(app);
messageRoutesConfig(app);

let postmanConfig = '';
readFile("postman_collection.json", 'utf8', (err, data) => {
    if (err) throw err;
    postmanConfig = data;
});

app.get('/', (req, res) => {

    res.send(`
<h1>Hey this is my API running 🥳</h1>
<p>Use the Postman config bellow to test this API</p>
<pre style="background-color: #f5f5f5; padding: 10px; border: 1px solid #000">
${postmanConfig}
</pre>
    `);

});

app.listen(80);
