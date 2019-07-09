const loops = require('./loops/loops.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(loops);
};
