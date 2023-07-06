import express from 'express';
import userRoutesConfig from './user/user_routes.js';
import messageRoutesConfig from './message/message_routes.js';

const app = express();
app.use(express.urlencoded({ extended: true }));

userRoutesConfig(app);
messageRoutesConfig(app);

app.listen(80);
