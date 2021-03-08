const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const pasanganSchema = new mongoose.Schema({
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
  pasanganKe: {
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

module.exports = mongoose.model("Pasangan", pasanganSchema);
