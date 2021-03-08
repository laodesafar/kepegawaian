const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const diklatSchema = new mongoose.Schema({
  namaDiklat: {
    type: String,
    required: true,
  },
  jumlahJam: {
    type: Number,
    required: true,
  },
  Penyelenggara: {
    type: String,
    required: true,
  },
  tempat: {
    type: String,
    required: true,
  },
  Angkatan: {
    type: String,
  },
  Tahun: {
    type: String,
    required: true,
  },
  nomorSttp: {
    type: String,
    required: true,
  },
  tanggalSttp: {
    type: Date,
    required: true,
  },
  sertifikat: {
    type: String,
    required: true,
  },
  pengabdiId: [
    {
      type: ObjectId,
      ref: "Pengabdi",
    },
  ],
});

module.exports = mongoose.model("Diklat", diklatSchema);
