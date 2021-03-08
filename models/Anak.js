const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const anakSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  tempatLahir: {
    type: String,
    required: true,
  },
  tanggalLahir: {
    type: Date,
    required: true,
  },
  jenisKelamin: {
    type: String,
    required: true,
  },
  pendidikan: String,
  pekerjaan: String,
  statusHubungan: String,
  anakPasanganKe: {
    type: Number,
    required: true,
  },
  pengabdiId: [
    {
      type: ObjectId,
      ref: "Pengabdi",
    },
  ],
});

module.exports = mongoose.model("Anak", anakSchema);
