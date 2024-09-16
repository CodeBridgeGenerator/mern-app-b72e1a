const { DepartmentDetails } = require('./departmentDetails.class');
const createModel = require('../../models/departmentDetails.model');
const hooks = require('./departmentDetails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/departmentDetails', new DepartmentDetails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('departmentDetails');

  service.hooks(hooks);
};