export default class IncorrectFieldsError extends Error {
    constructor(message) {
        super(message)
        this.name = 'IncorrectFieldsError'
        this.statusCode = 400;
    }
}