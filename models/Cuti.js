const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cutiSchema = new mongoose.Schema({
  nomorCuti: {
    type: String,
    required: true,
  },
  tanggalSurat: {
    type: Date,
    required: true,
  },
  jenisCuti: {
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
  terbilang: {
    type: String,
    required: true,
  },
  ketentuan: [
    {
      ketentuanA: String,
      ketentuanB: String,
      ketentuanC: String,
    },
  ],
  tembusan: [
    {
      tembusanA: String,
      tembusanB: String,
      tembusanC: String,
    },
  ],
  pengabdiId: [
    {
      type: ObjectId,
      ref: "Pengabdi",
    },
  ],
});

module.exports = mongoose.model("Cuti", cutiSchema);
