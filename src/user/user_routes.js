import UserDB from "./user_db.js";

function executeAndRespond(response, func)
{
    try
    {
        let result = func();
        response.status(200).send(result);
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
}
