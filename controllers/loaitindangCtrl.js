const LoaiTinDang = require("../models/loaitindangModel");

const loaitindangCtrl = {
  getLoaiTinDang: async (req, res) => {
    try {
      const loaitindang = await LoaiTinDang.find().populate("hinhthuc");

      res.json(loaitindang);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createLoaiTinDang: async (req, res) => {
    try {
      //role=1 -->admin
      //chỉ admin mới có quyên thê sửa xóa
      const { ten, hinhthuc } = req.body;
      const loaitindang = await LoaiTinDang.findOne({ ten }).populate(
        "HinhThuc"
      );
      if (loaitindang)
        return res.status(400).json({ msg: "Loại tin đăng đã tồn tại" });
      const newLoaiTinDang = new LoaiTinDang({ ten, hinhthuc });

      await newLoaiTinDang.save();
      res.json({ msg: "Đã tạo thành công loại tin đăng" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteLoaiTinDang: async (req, res) => {
    try {
      await LoaiTinDang.findByIdAndDelete(req.params.id);
      res.json({ msg: "Xóa thành công loại tin đăng" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateLoaiTinDang: async (req, res) => {
    try {
      const { ten, hinhthuc } = req.body;
      if (!ten || !hinhthuc) {
        res.json({ msg: "Vui lòng nhập vào tên loại tin và hình thức" });
      } else {
        await LoaiTinDang.findOneAndUpdate(
          { _id: req.params.id },
          { ten, hinhthuc }
        ).populate("HinhThuc");
        res.json({ msg: "Cập nhật thành công loại tin đăng" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = loaitindangCtrl;
