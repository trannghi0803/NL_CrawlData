const HinhThuc = require("../models/hinhthucModel");
const LoaiTinDang = require("../models/loaitindangModel");

const hinhthucCtrl = {
  getHinhThuc: async (req, res) => {
    try {
      const hinhthuc = await HinhThuc.find();
      res.json(hinhthuc);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  createHinhThuc: async (req, res) => {
    try {
      //role=1 -->admin
      //chỉ admin mới có quyên thê sửa xóa
      const { ten } = req.body;
      const hinhthuc = await HinhThuc.findOne({ ten });
      if (hinhthuc) {
        res.status(400).json({ msg: "Hình thức đã tồn tại!" });
      }
      const newHinhThuc = new HinhThuc({ ten });
      await newHinhThuc.save();
      res.json({ msg: "Đã tạo thành công hình thức" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  deleteHinhThuc: async (req, res) => {
    try {
      const conditionDelete = await LoaiTinDang.findOne({
        hinhthuc: req.params.id,
      });
      if (conditionDelete) {
        res.json({ msg: "Vui lòng xóa dữ liệu liên quan" });
      } else {
        await HinhThuc.findByIdAndDelete(req.params.id);
        res.json({ msg: "Xóa thành công hình thức" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateHinhThuc: async (req, res) => {
    try {
      const { ten } = req.body;
      await HinhThuc.findOneAndUpdate({ _id: req.params.id }, { ten });
      res.json({ msg: "Cập nhật thành công hình thức" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = hinhthucCtrl;
