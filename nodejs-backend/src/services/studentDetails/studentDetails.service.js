const { StudentDetails } = require('./studentDetails.class');
const createModel = require('../../models/studentDetails.model');
const hooks = require('./studentDetails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/studentDetails', new StudentDetails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('studentDetails');

  service.hooks(hooks);
};