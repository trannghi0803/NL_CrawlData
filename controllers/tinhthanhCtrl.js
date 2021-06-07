const TinhThanh = require("../models/tinhthanhModel");
const QuanHuyen = require("../models/quanhuyenModel");
const tinhthanhCtrl = {
  getTinhThanh: async (req, res) => {
    try {
      const tinhthanh = await TinhThanh.find();
      res.json(tinhthanh);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createTinhThanh: async (req, res) => {
    try {
      //role=1 -->admin
      //chỉ admin mới có quyên thêm sửa xóa
      const { ten } = req.body;
      const tinhthanh = await TinhThanh.findOne({ ten });
      if (tinhthanh) {
        res.status(400).json({ msg: "Tỉnh thành đã tồn tại!" });
      }
      const newHTinhThanh = new TinhThanh({ ten });
      await newHTinhThanh.save();
      res.json({ msg: "Đã tạo thành công tỉnh thành" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteTinhThanh: async (req, res) => {
    try {
      const conditionDelete = await QuanHuyen.findOne({
        tinhthanh: req.params.id,
      });
      if (conditionDelete) {
        res.json({ msg: "Vui lòng xóa dữ liệu liên quan" });
      } else {
        await TinhThanh.findByIdAndDelete(req.params.id);
        res.json({ msg: "Xóa thành công tỉnh thành" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateTinhThanh: async (req, res) => {
    try {
      const { ten } = req.body;

      //res.json({ msg: "Tỉnh thành không tồn tại" });
      await TinhThanh.findOneAndUpdate({ _id: req.params.id }, { ten });
      res.json({ msg: "Cập nhật Tỉnh thành thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = tinhthanhCtrl;
