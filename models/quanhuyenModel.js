const mongoose = require("mongoose");

const quanhuyenSchema = new mongoose.Schema({
  ten: {
    type: String,
    require: true,
    unique: true,
  },
  tinhthanh: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TinhThanh",
  },
});

module.exports = mongoose.model("QuanHuyen", quanhuyenSchema);
