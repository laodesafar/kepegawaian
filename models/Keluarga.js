const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const keluargaSchema = new mongoose.Schema({
  nik: {
    type: String,
    unique: true,
    required: true,
  },
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
  pendidikan: {
    type: String,
  },
  pekerjaan: {
    type: String,
  },
  hubungan: {
    type: String,
  },
  pengabdiId: [
    {
      type: ObjectId,
      ref: "Pengabdi",
    },
  ],
});

module.exports = mongoose.model("Keluarga", keluargaSchema);
