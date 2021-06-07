const BaiDang = require("../models/baidangModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryOjb = { ...this.queryString }; //queryString = req.query
    // console.log({ before: queryOjb }); //before delete page

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryOjb[el]);

    // console.log({ after: queryOjb }); //after delete page

    let queryStr = JSON.stringify(queryOjb);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    // console.log({ queryStr });

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const baidangCtrl = {
  getBaiDang: async (req, res) => {
    try {
      const features = new APIfeatures(
        BaiDang.find()
          .populate("hinhthuc")
          .populate("loaitindang")
          .populate("tinhthanh")
          .populate("quanhuyen")
          .populate("phuongxa"),
        req.query
      )
        .filtering()
        .sorting()
        .paginating();
      const baidang = await features.query;
      res.json({ status: "success", result: baidang.length, baidang: baidang });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createBaiDang: async (req, res) => {
    try {
      //role=1 -->admin
      //chỉ admin mới có quyên thê sửa xóa
      const {
        tieude,
        hinhthuc,
        loaitindang,
        tinhthanh,
        quanhuyen,
        phuongxa,
        dientich,
        gia,
        noidung,
        images,
        phaply,
        noithat,
        huongnha,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });
      const baidang = await BaiDang.findOne({ tieude }).populate("HinhThuc");
      if (baidang) return res.status(400).json({ msg: "Bài đăng đã tồn tại" });
      const newBaiDang = new BaiDang({
        tieude,
        hinhthuc,
        loaitindang,
        tinhthanh,
        quanhuyen,
        phuongxa,
        dientich,
        gia,
        noidung,
        images,
        phaply,
        noithat,
        huongnha,
      });

      await newBaiDang.save();
      res.json({ msg: "Đã tạo thành công Bài đăng" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBaiDang: async (req, res) => {
    try {
      await BaiDang.findByIdAndDelete(req.params.id);
      res.json({ msg: "Xóa thành công bài đăng" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBaiDang: async (req, res) => {
    try {
      const {
        tieude,
        hinhthuc,
        loaitindang,
        tinhthanh,
        quanhuyen,
        phuongxa,
        dientich,
        gia,
        noidung,
        images,
        phaply,
        noithat,
        huongnha,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      await BaiDang.findOneAndUpdate(
        { _id: req.params.id },
        {
          tieude,
          hinhthuc,
          loaitindang,
          tinhthanh,
          quanhuyen,
          phuongxa,
          dientich,
          gia,
          noidung,
          images,
          phaply,
          noithat,
          huongnha,
        }
      )
        .populate("HinhThuc")
        .populate("LoaiTinDang")
        .populate("TinhThanh")
        .populate("QuanHuyen")
        .populate("PhuongXa");
      res.json({ msg: "Cập nhật thành công bài đăng" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = baidangCtrl;
