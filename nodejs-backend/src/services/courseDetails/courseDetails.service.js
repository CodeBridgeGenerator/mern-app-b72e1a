const { CourseDetails } = require('./courseDetails.class');
const createModel = require('../../models/courseDetails.model');
const hooks = require('./courseDetails.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/courseDetails', new CourseDetails(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('courseDetails');

  service.hooks(hooks);
};