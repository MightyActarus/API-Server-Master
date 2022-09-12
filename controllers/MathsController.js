const Repository = require('../models/repository');
module.exports =
    class ContactsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            this.repository = new Repository(new ContactModel());
        }

        get(op, x, y) {
            switch(op){
                case '*':
                    console.log("star");
                    break;
                    case '-':
                console.log("star");
                    break;
                default:
                    console.log("default");
                    break;
            }
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