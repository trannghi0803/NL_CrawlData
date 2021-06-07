const PhuongXa = require("../models/phuongxaModel");
const DuongPho = require("../models/duongphoModel");

const duongphoCtrl = {
  getDuongPho: async (req, res) => {
    try {
      const duongpho = await DuongPho.find().populate("phuongxa");
      res.json(duongpho);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createDuongPho: async (req, res) => {
    try {
      //role=1 -->admin
      //chỉ admin mới có quyên thê sửa xóa
      const { ten, phuongxa } = req.body;
      const duongpho = await DuongPho.findOne({ ten }).populate("PhuongXa");
      if (duongpho)
        return res.status(400).json({ msg: "Đường phố đã tồn tại" });
      const newDuongPho = new DuongPho({ ten, phuongxa });

      await newDuongPho.save();
      await PhuongXa.updateMany(
        { _id: newDuongPho.phuongxa },
        { $push: { phuongxa: newDuongPho._id } }
      );

      res.json({ msg: "Đã tạo thành công Đường phố" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteDuongPho: async (req, res) => {
    try {
      const _id = req.params.id;
      const duongpho = await DuongPho.findOne({ _id });
      if (!duongpho) {
        res.json({ msg: "Không tìm thấy đường phố cần xóa" });
      } else {
        await duongpho.remove();
        await PhuongXa.updateMany(
          { _id: duongpho.phuongxa },
          { $pull: { phuongxa: duongpho._id } }
        );
        res.json({ msg: "Xóa thành công Phường xã" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateDuongPho: async (req, res) => {
    try {
      const { ten, phuongxa } = req.body;
      if (!ten || !phuongxa) {
        res.json({ msg: "Vui lòng nhập vào tên đường phố và Quận huyện" });
      } else {
        await PhuongXa.findOneAndUpdate(
          { _id: req.params.id },
          { ten, phuongxa }
        ).populate("PhuongXa");
        res.json({ msg: "Cập nhật thành công Đường phố" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = duongphoCtrl;
