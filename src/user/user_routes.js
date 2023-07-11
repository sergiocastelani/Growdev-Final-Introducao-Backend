import UserDB from "./user_db.js";

function executeAndRespond(responseObj, func)
{
    try
    {
        let result = func();
        responseObj.status(200).send(result);
    }
    catch(error)
    {
        responseObj.status(400).send(error.message);
    }
}

//module function that configs all User routes
export default function (expressApp)
{
    //--
    // User CRUD
    //--

    //Create
    expressApp.post('/user', function (req, res) 
    {
        executeAndRespond(res, () => UserDB.add(req.body.name, req.body.email, req.body.password));
    });

    //Delete
    expressApp.delete('/user/:id', function (req, res) 
    {
        executeAndRespond(res, () => UserDB.remove(parseInt(req.params.id)));
    });

    //Read
    expressApp.get('/user/:id', function (req, res) 
    {
        executeAndRespond(res, () => UserDB.find(parseInt(req.params.id)));
    });

    //Update
    expressApp.put('/user/:id', function (req, res)
    {
        executeAndRespond(res, () => UserDB.update(parseInt(req.params.id), req.body.name, req.body.password));
    });

    //Read All
    expressApp.get('/users', function (req, res) 
    {
        executeAndRespond(res, () => UserDB.all());
    });

    //Login
    expressApp.post('/user/login', function (req, res)
    {
        executeAndRespond(res, () => {
            let user = UserDB.findByEmail(req.body.email);
            if (user.password !== req.body.password)
            {
                throw new Error("Invalid password");
            }

            return `${user.name} logged in successfully`;
        });
    });
}
