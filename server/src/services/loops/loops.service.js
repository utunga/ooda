// Initializes the `loops` service on path `/loops`
const createService = require('feathers-mongoose');
const createModel = require('../../models/loops.model');
const hooks = require('./loops.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/loops', createService(options));


  // Get our initialized service so that we can register hooks
  const service = app.service('loops');
  // const loops = [
  //   { title: 'Learn vue', completed: true, week:0, status:"closed", createdFor: "miles", createdBy: "miles"  },
  //   { title: 'Learn vuex', completed: true, week:0, status:"closed", createdFor: "miles", createdBy: "miles" },
  //   { title: 'Learn feathers', completed: true, week:0, status:"closed", createdFor: "miles", createdBy: "miles"},
  //   { title: 'Learn feathers-vuex', completed: false, week:0, status:"open", createdFor: "miles", createdBy: "miles"},
  // ];
  // for (let loop of loops) {
  //   const found = await service.find({ query: { title: loop.title } });
  //   if (!found.total) {
  //     service.create(loop);
  //   }
  // }
  service.hooks(hooks);
};
