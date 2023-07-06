import MessageDB from "./message_db.js";

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

//module function that configs all Message routes
export default function (expressApp)
{
    //--
    // Message CRUD
    //--

    //Create
    expressApp.post('/message', function (req, res) 
    {
        tryExecute(res, () =>
        {
            let newMessage = MessageDB.add(parseInt(req.body.userId), req.body.title, req.body.description);
            res.status(200).send(newMessage);
        });
    });

    //Read specific message
    expressApp.get('/message/:id', function (req, res) 
    {
        tryExecute(res, () =>
        {
            let message = MessageDB.find(parseInt(req.params.id));
            res.status(200).send(message);
        });
    });

    //Read all user messages
    expressApp.get('/user_messages/:userId', function (req, res) 
    {
        tryExecute(res, () =>
        {
            let messages = MessageDB.findAll(parseInt(req.params.userId));
            res.status(200).send(messages);
        });
    });
    
    //Update
    expressApp.put('/message/:id', function (req, res)
    {
        tryExecute(res, () =>
        {
            let oldMessage = MessageDB.update(parseInt(req.params.id), req.body.title, req.body.description);
            res.status(200).send(oldMessage);
        });
    });

    //Delete
    expressApp.delete('/message/:id', function (req, res) 
    {
        tryExecute(res, () =>
        {
            let oldMessage = MessageDB.remove(parseInt(req.params.id));
            res.status(200).send(oldMessage);
        });
    });
}
