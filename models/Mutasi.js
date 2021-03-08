const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const mutasiSchema = new mongoose.Schema({
  nomorSk: {
    type: String,
    required: true,
  },
  tanggalMutasi: {
    type: Date,
    required: true,
  },
  unitDari: {
    type: String,
    required: true,
  },
  unitKe: {
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

module.exports = mongoose.model("Mutasi", mutasiSchema);
