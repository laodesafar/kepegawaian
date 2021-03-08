const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ijazahSchema = new mongoose.Schema({
  tingkat: {
    type: String,
    required: true,
  },
  namaInstansiPendidikan: {
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
  fileIjazah: {
    type: String,
    required: true,
  },
  isAktif: Boolean,
  pengabdiId: [
    {
      type: ObjectId,
      ref: "Pengabdi",
    },
  ],
});

module.exports = mongoose.model("Ijazah", ijazahSchema);
