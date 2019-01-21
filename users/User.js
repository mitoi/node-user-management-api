/**
 * The User class.
 * It takes care of the userModel and the routes associated tot the user
 */
class User{
    /**
     * @function getRoutes
     * @static
     * This function returns all the routes associated to the user.
     * @returns <express.Router> router
     */
    static getRoutes(){
        const express = require('express');
        const router = express.Router();

        router.post('/login', User.login);
        router.post('/register', User.register);
        router.get('/', User.retrieveAllUsers);
        router.get('/current', User.getCurrentUser);
        router.get('/:id', User.getById);
        router.put('/:id', User.update);
        router.delete('/:id', User.remove);
        return router;
    }
    
    static login(req, res){
        console.log("Logging in...");
        res.json({success:true});
    }

    static register(req, res){
        console.log("Registering user...");
        res.json({success:true});
    }

    static retrieveAllUsers(req, res){
        console.log("Retriving all users...");
        res.json({success:true});
    }

    static getCurrentUser(req, res){
        console.log("Retriving current user...");
        res.json({success:true});
    }

    static getById(req, res){
        console.log("Retriving user by id...");
        res.json({success:true});
    }

    static remove(req, res){
        console.log("Removing user...");
        res.json({success:true});
    }
}

module.exports = User;