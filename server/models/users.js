import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: String,
  email: String,
  bmi: String,
  city: String,
  photoUrl: String
});

/*schema.methods.serialize = function () {
    return {
        
      name: this.name,
      email: this.email,
      bmi: this.emi,
      city: this.city,

    }
};*/

const users = mongoose.model('users', schema);

export default users;