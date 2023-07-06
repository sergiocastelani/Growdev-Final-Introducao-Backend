import UserDB from "./user_db.js";

function tryExecute(response, func)
{
    try
    {
        func();
    }
    catch(error)
    {
        response.status(400).send(error.message);
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
        tryExecute(res, () =>
        {
            let newUser = UserDB.add(req.body.name, req.body.email, req.body.password);
            res.status(200).send(newUser);
        });
    });

    //Delete
    expressApp.delete('/user/:id', function (req, res) 
    {
        tryExecute(res, () =>
        {
            let oldUser = UserDB.remove(parseInt(req.params.id));
            res.status(200).send(oldUser);
        });
    });

    //Read
    expressApp.get('/user/:id', function (req, res) 
    {
        tryExecute(res, () =>
        {
            let user = UserDB.find(parseInt(req.params.id));
            res.status(200).send(user);
        });
    });

    //Update
    expressApp.put('/user/:id', function (req, res)
    {
        tryExecute(res, () =>
        {
            let user = UserDB.update(parseInt(req.params.id), req.body.name, req.body.password);
            res.status(200).send(user);
        });
    });
}
