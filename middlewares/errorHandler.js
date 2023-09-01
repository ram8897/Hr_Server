const { errorConstants } = require("../errorConstants");

exports.errorHandler = (err, req, res, next) => {
    // console.log(res.statusCode);
    var errorCode = res.statusCode ? res.statusCode : 500

    if(err.message.toLowerCase().includes('unexpected')){
        errorCode = err.statusCode
    }

    switch (errorCode) {
        case errorConstants.NOT_VALIDATE:
            res.json({ title: 'Validation Error!', message: err.message, stackTrace: err.stack }) 
            break;
        
        case errorConstants.UN_AUTHORIZED:
            res.json({ title: 'Un authorized!', message: err.message, stackTrace: err.stack })
            break;
        
        case errorConstants.FORBIDDEN:
            res.json({ title: 'Forbidden!', message: err.message, stackTrace: err.stack })
            break;
        
        case errorConstants.NOT_FOUND:
            res.json({ title: 'Not Found!', message: err.message, stackTrace: err.stack })
            break;
        
        case errorConstants.SERVER_ERROR:
            res.json({ title: 'Server Error!', message: err.message, stackTrace: err.stack })
            break;
        
        default:
            console.log('No Error!')
            break;
    }
}

