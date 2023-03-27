const  mongoose  = require("mongoose");

const rentaluserSchema = new mongoose.Schema({
    //   first_name: { type: String, default: null },
    name: { type: String, default: null },
    gender:{type: String},
    mobileno: { type: Number,default: null },
    address: { type: String,default: null  },
    designation: { type: String,default: null  },
    profilePic:{type:Buffer}
  });

  
module.exports = mongoose.model("rentUsermodel", rentaluserSchema);