const mongoose = require("mongoose");

const tinhthanhSchema = new mongoose.Schema({
  ten: {
    type: String,
    require: true,
    unique: true,
  },
});
module.exports = mongoose.model("TinhThanh", tinhthanhSchema);
