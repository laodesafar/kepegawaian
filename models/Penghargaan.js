const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const penghargaanSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  tahun: {
    type: String,
    required: true,
  },
  instansiPemberi: {
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

module.exports = mongoose.model("Penghargaan", penghargaanSchema);
