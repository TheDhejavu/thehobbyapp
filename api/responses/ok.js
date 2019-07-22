/**
 * 201 (Created) Response
 * Successful creation occurred (via either POST or PUT).
 * Set the Location header to contain a link
 * Response body content may or may not be present.
 */
module.exports = function (data, code, message) {
    var response = {
      code: code || 'OK',
      message: message || 'Operation is successfully executed',
      data: data || {}
    }

    this.req._sails.log.silly('Sent (200 OK)\n', response);

    this.res.status(200);
    this.res.json(response);
};