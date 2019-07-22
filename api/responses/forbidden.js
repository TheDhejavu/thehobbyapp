/**
 * 403 forbidden Response

 */
module.exports = function (data, code, message) {
    var response = {
      code: code || 'E_FORBIDDEN',
      message: message || 'An error occurred.',
      data: data || {}
    }

    this.req._sails.log.silly('Sent (403)\n', response);

    this.res.status(403);
    this.res.json(response);
};