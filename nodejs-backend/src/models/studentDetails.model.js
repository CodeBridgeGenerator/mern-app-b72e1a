
    module.exports = function (app) {
        const modelName = 'student_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            stuName: { type: String, required: true, minLength: null, maxLength: null },
DOB: { type: Date, required: false },
courseName: { type: Schema.Types.ObjectId, ref: "course_details" },
address: { type: String, required: true },

            
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