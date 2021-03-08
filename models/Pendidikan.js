const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const pendidikanSchema = new mongoose.Schema({
  tingkat: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  lokasi: {
    type: String,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
  nomorIjazah: {
    type: String,
    required: true,
  },
  tanggalIjazah: {
    type: Date,
    required: true,
  },
  namaPimpinan: {
    type: String,
    required: true,
  },
  fotoUrl: {
    type: String,
    required: true,
  },
  isAktif: {
    type: Boolean,
    default: false,
  },
  pengabdiId: [
    {
      type: ObjectId,
      ref: "Pengabdi",
    },
  ],
});

module.exports = mongoose.model("Pendidikan", pendidikanSchema);
