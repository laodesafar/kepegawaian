const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const naikJabatanSchema = new mongoose.Schema({
  nomorSk: {
    type: String,
    required: true,
  },
  tanggalSk: {
    type: Date,
    required: true,
  },
  tmtJabatanAwal: {
    type: Date,
    required: true,
  },
  tmtJabatanAkhir: {
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
  jabatanId: [
    {
      type: ObjectId,
      ref: "Jabatan",
    },
  ],
  pengabdiId: [
    {
      type: ObjectId,
      ref: "Pengabdi",
    },
  ],
});

module.exports = mongoose.model("NaikJabatan", naikJabatanSchema);
