/**
 * 500 (Created) Response

 */
module.exports = function (data, code, message) {
    var response ={
      code: code || 'E_INTERNAL_SERVER_ERROR',
      message: message || 'An error occurred.',
      data: data || {}
    }

    this.req._sails.log.silly('Sent (500)\n', response);

    this.res.status(500);
    this.res.json(response);
};