import express from 'express';
import userRoutesConfig from './user_routes.js';


const app = express();
app.use(express.urlencoded({ extended: true }));

userRoutesConfig(app);

app.listen(80);
