const mongoose = require("mongoose");

const loaitindangSchema = new mongoose.Schema({
  ten: {
    type: String,
    require: true,
    unique: true,
  },
  hinhthuc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HinhThuc",
  },
});

module.exports = mongoose.model("LoaiTinDang", loaitindangSchema);
