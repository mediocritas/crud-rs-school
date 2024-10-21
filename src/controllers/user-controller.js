import UserService from '../services/in-memory-user-service.js';
import Validator from '../errors/request-validator.js';

const userService = new UserService()
const validator = new Validator()

export default class UserController {

async getUsers() {
    return userService.getAllUsers()
}

async getUser(id) {
    return userService.getUserById(id)
}

async postUser(user) {
    validator.validateUserData(user)
    return userService.createUser(user)
}

async putUser(id, user) {
    validator.validateUserData(user)
    return userService.updateUserById(id, user)
}

async deleteUser(id) {
    return userService.deleteUserById(id)
}
}