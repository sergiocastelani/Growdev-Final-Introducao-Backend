import MessageDB from "./message_db.js";
import { Router } from "express";

export const messageRouter = Router();

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

//--
// Message CRUD
//--

//Create
messageRouter.post('/message', function (req, res) 
{
    executeAndRespond(res, () => MessageDB.add(parseInt(req.body.userId), req.body.title, req.body.description));
});

//Read specific message
messageRouter.get('/message/:id', function (req, res) 
{
    executeAndRespond(res, () => MessageDB.find(parseInt(req.params.id)));
});

//Read all user messages
messageRouter.get('/user_messages/:userId', function (req, res) 
{
    executeAndRespond(res, () => {
        let messages = MessageDB.findAll(parseInt(req.params.userId));

        const messagesPerPage = 5;
        let lastPage = Math.ceil(messages.length / messagesPerPage);
        let page = parseInt(req.query.page);
        if (!page || page > lastPage || page < 1)
            throw new Error(`Bad page number. Valid range is [1 - ${lastPage}]`);

        let startIndex = (page - 1) * messagesPerPage;
        let endIndex = startIndex + messagesPerPage;

        let messagesPage = messages.filter((message, index) => index >= startIndex && index < endIndex);

        return {
            info: {
                total: messages.length,
                page: page,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: endIndex < messages.length ? page + 1 : null
            },
            messages: messagesPage,
        };
    });
});

//Update
messageRouter.put('/message/:id', function (req, res)
{
    executeAndRespond(res, () => MessageDB.update(parseInt(req.params.id), req.body.title, req.body.description));
});

//Delete
messageRouter.delete('/message/:id', function (req, res) 
{
    executeAndRespond(res, () => MessageDB.remove(parseInt(req.params.id)));
});
