const Repository = require('../models/repository');
module.exports =
    class ContactsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            this.repository = new Repository(new ContactModel());
        }

        get(id) {

        }
        post(data) {
            this.HttpContext.response.notImplemented();
        }
        put(data) {
            this.HttpContext.response.notImplemented();
        }
        remove(id) {
            this.HttpContext.response.notImplemented();
        }
    }