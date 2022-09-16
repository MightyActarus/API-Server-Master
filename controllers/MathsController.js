const path = require('path');
const fs = require('fs');

module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            //  Operators
            this.accessors = {};
            this.accessors[" "] = params => this.addition(params);
            this.accessors["-"] = params => this.soustraction(params);
            this.accessors["*"] = params => this.multiplication(params);
            this.accessors["/"] = params => this.division(params);
            this.accessors["%"] = params => this.modulos(params);
            this.accessors["!"] = params => this.factorial(params);
            this.accessors["p"] = params => this.prime(params);
            this.accessors["np"] = params => this.nextPrime(params);
            this.error = null;
        }
        get(id) {
            let params = this.HttpContext.path.params;
            let answer;
            if(this.HttpContext.path.queryString == '?'){
                return this.CreateHelpPage();
            }
            else if(this.accessors[params.op] != undefined){
                answer = this.accessors[params.op](params);
            }
            else{
                this.error = "Invalid Operator";
            }
            if(this.error !== null){
                return this.HttpContext.response.JSON({...params, "error": this.error});
            }
            else{
                return this.HttpContext.response.JSON({...params, "value": answer});
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
        CreateHelpPage(){
            //Creation of a Html page
            let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/MathsServiceHelp.html");
            //fs -> File system, needs to be required with --const fs = require('fs');--
            let content = fs.readFileSync(helpPagePath);
            //Display the html page
            return this.HttpContext.response.content("text/html", content);
        }

        oneVariableCheck(params){
            if(Object.keys(params).length == 2){
                if(isNaN(params.n)){ this.error = "ERROR CODE 422: Invalid n parameter"; }
                else{ return true; }
            }
            else if(Object.keys(params).length > 2){ this.error = "ERROR CODE 422: Too many parameters"; }
            else { this.error = "ERROR CODE 422: Missing parameters"; }
            return false
        }
        twoVariablesVariableCheck(params){
            if(Object.keys(params).length == 3){
                if(isNaN(params.x)){ this.error = "ERROR CODE 422: Invalid X parameter"; }
                else if(isNaN(params.y)){ this.error = "ERROR CODE 422: Invalid Y parameter"; }
                else{ return true; }
            }
            else if(Object.keys(params).length > 3){ this.error = "ERROR CODE 422: Too many parameters"; }
            else { this.error = "Missing parameters"; }
            return false;
        }
        addition(params){
            this.HttpContext.path.params.op = "+";
            if(this.twoVariablesVariableCheck(params))
            return parseFloat(params.y) + parseFloat(params.x);
        }
        soustraction(params){
            if(this.twoVariablesVariableCheck(params))
            return parseFloat(params.x) - parseFloat(params.y);    
        }
        multiplication(params){
            if(this.twoVariablesVariableCheck(params))
            return parseFloat(params.x) * parseFloat(params.y);
        }
        division(params){
            if(this.twoVariablesVariableCheck(params)){
                if(params.x == 0){
                    return "NaN";
                }
                else{
                    if(params.y == 0){
                        return "Infinity";
                    }
                    else{
                        return parseFloat(params.x) / parseFloat(params.y);
                    }
                }
            }
        }
        modulos(params){
            if(this.twoVariablesVariableCheck(params)){
                if(params.x == 0 || params.y ==0){
                    return "NaN"
                }
                else{
                    return parseFloat(params.x) % parseFloat(params.y);
                }
            }
        }
        factorial(params){
            if(this.oneVariableCheck(params))
            if(parseInt(params.n) >= 0){ return this.getFactorial(parseInt(params.n)); }
            else{ this.error = "ERROR CODE 422: n parameter must be positive"; }
        }
        prime(params){
            if(this.oneVariableCheck(params)){
                if(params.n - Math.floor(params.n) == 0)
                    return this.isPrime(parseInt(params.n));
                else
                    this.error = "ERROR CODE 422: this function requires n to be an integer"
            }
        }
        nextPrime(params){
            if(this.oneVariableCheck(params)){
                if(params.n - Math.floor(params.n) == 0)
                    return this.findPrime(parseInt(params.n));
                else
                    this.error = "ERROR CODE 422: this function requires n to be an integer"
            }
        }
        getFactorial(n){
            if(n===0||n===1){
              return 1;
            }
            return n*this.getFactorial(n-1);
        }

        isPrime(value) {
            for(var i = 2; i < value; i++) {
                if(value % i === 0) {
                    return false;
                }
            }
            return value > 1;
        }
        findPrime(n){
            let primeNumer = 0;
            for ( let i=0; i < n; i++){
                primeNumer++;
                while (!this.isPrime(primeNumer)){
                    primeNumer++;
                }
            }
            return primeNumer;
        }
    }
