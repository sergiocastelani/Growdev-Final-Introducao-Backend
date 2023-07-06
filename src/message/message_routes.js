import MessageDB from "./message_db.js";

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

//module function that configs all Message routes
export default function (expressApp)
{
    //--
    // Message CRUD
    //--

    //Create
    expressApp.post('/message', function (req, res) 
    {
        executeAndRespond(res, () => MessageDB.add(parseInt(req.body.userId), req.body.title, req.body.description));
    });

    //Read specific message
    expressApp.get('/message/:id', function (req, res) 
    {
        executeAndRespond(res, () => MessageDB.find(parseInt(req.params.id)));
    });

    //Read all user messages
    expressApp.get('/user_messages/:userId', function (req, res) 
    {
        executeAndRespond(res, () => MessageDB.findAll(parseInt(req.params.userId)));
    });
    
    //Update
    expressApp.put('/message/:id', function (req, res)
    {
        executeAndRespond(res, () => MessageDB.update(parseInt(req.params.id), req.body.title, req.body.description));
    });

    //Delete
    expressApp.delete('/message/:id', function (req, res) 
    {
        executeAndRespond(res, () => MessageDB.remove(parseInt(req.params.id)));
    });
}
