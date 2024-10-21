export default class NoSuchUserError extends Error {
    constructor(message) {
        super(message)
        this.name = 'NoSuchUserError'
        this.statusCode = 404;
    }
}