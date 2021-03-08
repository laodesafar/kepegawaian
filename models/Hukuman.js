const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const hukumanSchema = new mongoose.Schema({
  jenisHukuman: {
    type: String,
    required: true,
  },
  pejabatPengesah: {
    type: String,
    required: true,
  },
  nomorSk: {
    type: String,
    required: true,
  },
  tanggalSk: {
    type: Date,
    required: true,
  },
  pejabatPemulihan: {
    type: String,
    required: true,
  },
  nomorSkPemulihan: {
    type: String,
    required: true,
  },
  tanggalSkPemulihan: {
    type: Date,
    required: true,
  },
  pengabdiId: [
    {
      type: ObjectId,
      ref: "Pengabdi",
    },
  ],
});

module.exports = mongoose.model("Hukuman", hukumanSchema);
