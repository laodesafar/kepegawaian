const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const naikGolonganSchema = new mongoose.Schema({
  tmtGolongan: {
    type: Date,
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
  fotoUrl: {
    type: String,
  },
  isAktif: {
    type: Boolean,
    default: false,
  },
  golonganId: [
    {
      type: ObjectId,
      ref: "Golongan",
    },
  ],
  pengabdiId: [
    {
      type: ObjectId,
      ref: "Pengabdi",
    },
  ],
});

module.exports = mongoose.model("NaikGolongan", naikGolonganSchema);
