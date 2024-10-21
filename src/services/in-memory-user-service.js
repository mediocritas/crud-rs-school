import { USERS } from '../database/in-memory-users.js'
import NoSuchUserError from '../errors/no-such-user-error.js';

export default class UserService {

    async getAllUsers() {
        try {
            return USERS;
        } catch (err) {
            console.error('GET api/users error')
        }
    }

    async getUserById(id) {
        const user = USERS.find(user => user.id === id)
        if (user === undefined) {
            throw new NoSuchUserError(`no user with id ${id}`)
        }
        return user;
    }

    async createUser(newUser) {
        if (USERS.filter(user => user.id === newUser.id).length > 0) {
            throw new Error(`user with id ${newUser.id} already exists`)
        }
        USERS.push(newUser);
        return newUser;
    }

    async updateUserById(id, updatedUser) {
        const indexToUpdate = USERS.findIndex(user => user.id === id);
        if (indexToUpdate === -1) {
            throw new NoSuchUserError(`user with id ${id} does not exist`)
        }
        USERS.splice(indexToUpdate, 1, { ...USERS[indexToUpdate], ...updatedUser });
        return updatedUser;
    }

    async deleteUserById(id) {
        const indexToDelete = USERS.findIndex(user => user.id === id)
        if (indexToDelete === -1) {
            throw new NoSuchUserError(`user with id ${id} does not exist`)
        }
        USERS.splice(indexToDelete, 1)
    }
}
