const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const latihanJabatanSchema = new mongoose.Schema({
  namaPelatih: {
    type: String,
    required: true,
  },
  tahun: {
    type: String,
    required: true,
  },
  jumlahJam: {
    type: Number,
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

module.exports = mongoose.model("LatihanJabatan", latihanJabatanSchema);
