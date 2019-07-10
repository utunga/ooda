// loopz-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const loops = new Schema({
    title: { type: String, required: true },
    status: { type: String, required: true, default: "proposed" }, // FIXME how to constrain to a schema
    success: { type: Boolean, required: true, default: false },
    completed: { type: Boolean, required: true, default: false },
    week: { type: Number, default:0 },  //FIXME need logic to set this 
    createdBy: { type: String },
    for:  { type: String }
  }, {
    timestamps: true
  });

  return mongooseClient.model('loops', loops);
};
