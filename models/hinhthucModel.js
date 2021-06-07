const mongoose = require("mongoose");

const hinhthucSchema = new mongoose.Schema({
  ten: {
    type: String,
    require: true,
    unique: true,
  },
});
module.exports = mongoose.model("HinhThuc", hinhthucSchema);
