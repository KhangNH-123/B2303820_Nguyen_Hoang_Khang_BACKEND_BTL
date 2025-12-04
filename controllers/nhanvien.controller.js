const NhanVien = require('../models/NhanVien');
const bcrypt = require('bcrypt');

module.exports = {
  getAll: async (req, res) => res.json(await NhanVien.find().select('-password')),

  create: async (req, res) => {
    const { MSNV, HoTenNV, password, ChucVu } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const nv = new NhanVien({ MSNV, HoTenNV, password: hashed, ChucVu });
    await nv.save();
    res.json({ message: 'Đã tạo nhân viên' });
  },

  update: async (req, res) => {
    const body = { ...req.body };
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }
    await NhanVien.findByIdAndUpdate(req.params.id, body);
    res.json({ message: 'Đã cập nhật' });
  },

  delete: async (req, res) => {
    await NhanVien.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa' });
  }
};
