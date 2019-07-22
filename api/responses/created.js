/**
 * 201 (Created) Response
 * Successful creation occurred (via either POST or PUT).
 * Set the Location header to contain a link
 * to the newly-created resource (on POST).
 * Response body content may or may not be present.
 */
module.exports = function (data, code, message) {
    var response = {
      code: code || 'CREATED',
      message: message || 'The request has been fulfilled and resulted in a new resource being created',
      data: data || {}
    }


    this.res.status(201);
    this.res.json(response);
};