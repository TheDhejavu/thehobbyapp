/**
 * 401 (Unauthorized) Response
 * Similar to 403 Forbidden.
 * Specifically for authentication failed or not yet provided.
 */
module.exports = function (data, code, message) {
    var response = {
      code: code || 'E_UNAUTHORIZED',
      message: message || 'Missing or invalid authentication token',
      data: data || {}
    }

    this.req._sails.log.silly('Sent (401 UNAUTHORIZED)\n', response);

    this.res.status(401);
    this.res.json(response);
  };