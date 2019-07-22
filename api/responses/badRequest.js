/**
 * 400 (bad request) Response

 */
module.exports = function (data, code, message) {
    var response = {
      code: code || 'E_BAD_REQUEST',
      message: message || 'An error occurred.',
      data: data || {}
    }

    this.req._sails.log.silly('Sent (400)\n', response);

    this.res.status(400);
    this.res.json(response);
};