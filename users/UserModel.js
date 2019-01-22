const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const UserSchema = db.User;

class User{
    constructor(){}

    async login({username, password}){
        const user = await UserSchema.findOne({ username });
        if (user && bcrypt.compareSync(password, user.hash)) {
            const { hash, ...userWithoutHash } = user.toObject();
            const token = jwt.sign({ sub: user.id }, config.secret);
            return {
                ...userWithoutHash,
                token
            };
        }
    }

    async retrieveAllUsers() {
        return await UserSchema.find().select('-hash');
    }

    async getById(id) {
        return await UserSchema.findById(id).select('-hash');
    }
    
    async create(userParam) {
        // validate
        console.log(userParam);
        if (await UserSchema.findOne({ username: userParam.username })) {
            throw 'Username "' + userParam.username + '" is already taken';
        }
    
        const user = new UserSchema(userParam);
    
        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }
    
        // save user
        await user.save();
    }
    
    async update(id, userParam) {
        const user = await UserSchema.findById(id);
    
        // validate
        if (!user) throw 'User not found';
        if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
            throw 'Username "' + userParam.username + '" is already taken';
        }
    
        // hash password if it was entered
        if (userParam.password) {
            userParam.hash = bcrypt.hashSync(userParam.password, 10);
        }
    
        // copy userParam properties to user
        Object.assign(user, userParam);
    
        await user.save();
    }
    
    async remove(id) {
        await UserSchema.findByIdAndRemove(id);
    }
}

module.exports = User;