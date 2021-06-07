const mongoose = require("mongoose");

const baidangSchema = new mongoose.Schema(
  {
    tieude: {
      type: String,
      require: true,
      unique: true,
    },
    hinhthuc: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HinhThuc",
    },
    loaitindang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoaiTinDang",
    },
    tinhthanh: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TinhThanh",
    },
    quanhuyen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuanHuyen",
    },
    phuongxa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PhuongXa",
    },
    dientich: {
      type: Number,
      trim: true,
    },
    gia: {
      type: Number,
      trim: true,
      require: true,
    },
    noidung: {
      type: String,
      require: true,
    },
    images: {
      type: Object,
      require: true,
    },
    phaply: {
      type: String,
    },
    noithat: {
      type: String,
    },
    huongnha: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BaiDang", baidangSchema);
