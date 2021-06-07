const PhuongXa = require("../models/phuongxaModel");
const difference = require("../middleware/config");

const phuongxaCtrl = {
  getPhuongXa: async (req, res) => {
    try {
      const phuongxa = await PhuongXa.find().populate("quanhuyen");

      res.json(phuongxa);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPhuongXa: async (req, res) => {
    try {
      //role=1 -->admin
      //chỉ admin mới có quyên thêm sửa xóa
      const { ten, quanhuyen } = req.body;
      const phuongxa = await PhuongXa.findOne({ ten }).populate("QuanHuyen");
      if (phuongxa)
        return res.status(400).json({ msg: "Phường xã đã tồn tại" });
      const newPhuongXa = new PhuongXa({ ten, quanhuyen });

      await newPhuongXa.save();
      // await DuongPho.updateMany(
      //   { _id: newPhuongXa.duongpho },
      //   { $push: { duongpho: newPhuongXa._id } }
      // );

      res.json({ msg: "Đã tạo thành công phường xã" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletePhuongXa: async (req, res) => {
    try {
      const _id = req.params.id;
      const phuongxa = await PhuongXa.findOne({ _id });
      if (!phuongxa) {
        res.json({ msg: "Không tìm thấy phường xã cần xóa" });
      } else {
        await phuongxa.remove();
        // await DuongPho.updateMany(
        //   { _id: phuongxa.duongpho },
        //   { $pull: { duongpho: phuongxa._id } }
        // );
        res.json({ msg: "Xóa thành công Phường xã" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePhuongXa: async (req, res) => {
    try {
      const { ten, quanhuyen } = req.body;
      if (!ten || !quanhuyen) {
        res.json({ msg: "Vui lòng nhập vào tên phường xã và Quận huyện" });
      } else {
        await PhuongXa.findOneAndUpdate(
          { _id: req.params.id },
          { ten, quanhuyen }
        ).populate("QuanHuyen");
        res.json({ msg: "Cập nhật thành công Quận huyện" });
        // const _id = req.params.id;

        // const newDuongPho = duongpho || []; //tạo đường phố mới từ req
        // const oldPhuongXa = await PhuongXa.findOne({ _id }); //tìm phường xã đã có trong csdl
        // const oldDuongPho = oldPhuongXa.duongpho;
        // Object.assign(oldPhuongXa, { ten, quanhuyen });
        // const newPhuongXa = await oldPhuongXa.save();

        // const added = difference(newDuongPho, oldDuongPho); //lấy ra phần tử thuộc new không thuộc old
        // const removed = difference(oldDuongPho, newDuongPho); //ngược lại phía trên
        // await DuongPho.updateMany(
        //   {
        //     _id: added,
        //   },
        //   { $addToSet: { phuongxa: PhuongXa._id } }
        // );
        // await DuongPho.updateMany(
        //   {
        //     _id: removed,
        //   },
        //   { $pull: { phuongxa: PhuongXa._id } }
        // );

        // return res.send(newPhuongXa);
        // await PhuongXa.findOneAndUpdate(
        //   { _id: req.params.id },
        //   { ten, quanhuyen }
        // ).populate("QuanHuyen");
        // res.json({ msg: "Cập nhật thành công Phường xã" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = phuongxaCtrl;
