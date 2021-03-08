const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const seminarSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  tempat: {
    type: String,
    required: true,
  },
  penyelenggara: {
    type: String,
    required: true,
  },
  tanggalAwal: {
    type: Date,
    required: true,
  },
  tanggalAkhir: {
    type: Date,
    required: true,
  },
  nomorPiagam: {
    type: String,
    required: true,
  },
  tanggalPiagam: {
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

module.exports = mongoose.model("Seminar", seminarSchema);
