import User from "./user.js";

let userDB = [];
let nextID = 1;

//class UserDB
export default class UserDB
{
    //create and add a new user to the DB
    //returns the new user
    static add(name, email, password)
    {
        email = email.toLowerCase();
        let existingUserId = userDB.findIndex((u) => u.email === email);

        if (existingUserId >= 0)
        {
            throw new Error("Email already registered");
        }
        else
        {
            let newUser = new User(nextID++, name, email, password);
            userDB.push(newUser);
            return newUser;
        }
    }

    //removes an user from DB
    //returns the removed user
    static remove(id) 
    {
        let existingUserId = userDB.findIndex((u) => u.id === id);

        if (existingUserId >= 0)
        {
            let oldUser = userDB[existingUserId];
            userDB.splice(existingUserId, 1);
            return oldUser;
        }
        else
        {
            throw new Error("User not found");
        }
    }

    //finds an user in DB by ID
    static find(id)
    {
        let existingUserId = userDB.findIndex((u) => u.id === id);

        if (existingUserId< 0)
        {
            throw new Error("User not found");
        }
        else
        {
            return userDB[existingUserId];;
        }
    }

    //Updates user name and password.
    //Undefined parameters are not updated.
    static update(id, name, password)
    {
        let user = userDB.find((u) => u.id === id);

        if (user)
        {
            if (name != undefined)
                user.name = name;

            if (password != undefined)
                user.password = password;

            return user;
        }
        else
        {
            throw new Error("User not found");
        }
    }
}

//fill DB with some data
UserDB.add("John Doe", "xxx@xxxx.com", "password");
