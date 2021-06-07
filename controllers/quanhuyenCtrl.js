const QuanHuyen = require("../models/quanhuyenModel");
const PhuongXa = require("../models/phuongxaModel");
const quanhuyenCtrl = {
  getQuanHuyen: async (req, res) => {
    try {
      const quanhuyen = await QuanHuyen.find().populate("tinhthanh");

      res.json(quanhuyen);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createQuanHuyen: async (req, res) => {
    try {
      //role=1 -->admin
      //chỉ admin mới có quyên thê sửa xóa
      const { ten, tinhthanh } = req.body;
      const quanhuyen = await QuanHuyen.findOne({ ten }).populate("TinhThanh");
      if (quanhuyen)
        return res.status(400).json({ msg: "Quận huyện đã tồn tại" });
      const newQuanHuyen = new QuanHuyen({ ten, tinhthanh });

      await newQuanHuyen.save();
      res.json({ msg: "Đã tạo thành công quận huyện" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteQuanHuyen: async (req, res) => {
    try {
      const conditionDelete = await PhuongXa.findOne({
        quanhuyen: req.params.id,
      });
      if (conditionDelete) {
        res.json({ msg: "Vui lòng xóa dữ liệu liên quan" });
      } else {
        await QuanHuyen.findByIdAndDelete(req.params.id);
        res.json({ msg: "Xóa thành công Quận huyện" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateQuanHuyen: async (req, res) => {
    try {
      const { ten, tinhthanh } = req.body;
      if (!ten || !tinhthanh) {
        res.json({ msg: "Vui lòng nhập vào tên hoặc tỉnh thành" });
      } else {
        await QuanHuyen.findOneAndUpdate(
          { _id: req.params.id },
          { ten, tinhthanh }
        ).populate("TinhThanh");
        res.json({ msg: "Cập nhật thành công Quận huyện" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = quanhuyenCtrl;
