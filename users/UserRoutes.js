/**
 * The User class.
 * It takes care of the routes associated to the user
 */
class UserRoutes {

    /**
     * @function getRoutes
     * @static
     * This function returns all the routes associated to the user.
     * @returns {Router} router
     */
    static getRoutes() {
        const User = require('./UserModel');
        this.user = new User();
        const express = require('express');
        const router = express.Router();

        router.post('/login', this.login.bind(this.user));
        router.post('/register', this.register.bind(this.user));
        router.get('/', this.retrieveAllUsers);
        router.get('/current', this.getCurrentUser);
        router.get('/:id', this.getById);
        router.put('/:id', this.update);
        router.delete('/:id', this.remove);
        return router;
    }

    /**
     * @function login
     * @static
     * Function used for loging in users
     * @param {*} req - the request
     * @param {*} res - the response
     */
    static login(req, res) {
        console.log("Logging in...");
        this.login(req.body)
            .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
            .catch(err => next(err));
    }

    /**
     * @function register
     * @static
     * Function used for registerig users
     * @param {*} req 
     * @param {*} res 
     */
    static async register(req, res, next) {
        console.log("Registering user...");
        this.create(req.body)
            .then(() => res.json({ success: true }))
            .catch(err => next(err));
    }

    /**
     * @function retrieveAllUsers
     * @static
     * Function used for retrieving all users
     * @param {*} req 
     * @param {*} res 
     */
    static retrieveAllUsers(req, res) {
        console.log("Retriving all users...");
        this.retrieveAllUsers()
            .then(users => res.json(users))
            .catch(err => next(err));
    }

    /**
     * @function getCurrentUser
     * @static
     * Function used for retrieving the current user
     * @param {*} req 
     * @param {*} res 
     */
    static getCurrentUser(req, res) {
        console.log("Retriving current user...");
        this.getById(req.user.sub)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    }

    /**
     * @function getById
     * @static
     * Function used to retrieve user by id
     * @param {*} req 
     * @param {*} res 
     */
    static getById(req, res) {
        console.log("Retriving user by id...");
        this.getById(req.params.id)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    }

    /**
     * @function update
     * @static
     * Function used for updating users
     * @param {*} req 
     * @param {*} res 
     */
    static update(req, res) {
        console.log("Updating the user...");
        this.update(req.params.id, req.body)
            .then(() => res.json({}))
            .catch(err => next(err));
    }

    /**
     * @function remove
     * @static
     * Function used to remove a user
     * @param {*} req 
     * @param {*} res 
     */
    static remove(req, res) {
        console.log("Removing user...");
        this.delete(req.params.id)
            .then(() => res.json({}))
            .catch(err => next(err));
    }
}

module.exports = UserRoutes;