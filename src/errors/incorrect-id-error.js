export default class IncorrectIdError extends Error {
    constructor(message) {
        super(message)
        this.name = 'IncorrectIdError'
        this.statusCode = 400;
    }
}