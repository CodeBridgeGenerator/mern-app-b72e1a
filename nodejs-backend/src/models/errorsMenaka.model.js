
    module.exports = function (app) {
        const modelName = 'errors_menaka';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            serviceName: { type: String, required: true, maxLength: null },
error: { type: String, required: true },
stack: { type: String, required: true },
details: { type: String, required: true },
createdBy: { type: String, required: true },
updatedBy: { type: String, required: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };