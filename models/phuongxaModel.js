const mongoose = require("mongoose");

const phuongxaSchema = new mongoose.Schema({
  ten: {
    type: String,
    require: true,
    unique: true,
  },
  quanhuyen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuanHuyen",
  },
});

module.exports = mongoose.model("PhuongXa", phuongxaSchema);
