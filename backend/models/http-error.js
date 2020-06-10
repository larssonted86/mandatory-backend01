
class HttpError extends Error {
  constructor(message, errorCode){
    super(message); // Adda a "message" property
    this.code = errorCode; // addns a "code" property
  }  
}

module.exports = HttpError;

