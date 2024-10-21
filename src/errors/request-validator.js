import IncorrectFieldsError from "./incorrect-object-fields.js";

export default class Validator {

    validateUserData(userData) {
        const requiredFields = ['username', 'age', 'hobbies'];

        for (const field of requiredFields) {
            if (!userData.hasOwnProperty(field)) {
                throw new IncorrectFieldsError(`Field '${field}' is missing`);
            }
        }

        if (typeof userData.username !== 'string') {
            throw new IncorrectFieldsError(`'username' should be a string`);
        }
        if (typeof userData.age !== 'number') {
            throw new IncorrectFieldsError(`'age' should be a number`);
        }
        if (!Array.isArray(userData.hobbies)) {
            throw new IncorrectFieldsError(`'hobbies' should be an array`);
        }
        if (userData.hobbies.some(hobby => typeof hobby !== 'string')) {
            throw new IncorrectFieldsError(`'hobbies' should be a string`);
        }
    }


}