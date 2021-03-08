const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const penugasanSchema = new mongoose.Schema({
  negaraTujuan: {
    type: String,
    required: true,
  },
  tahun: {
    type: String,
    required: true,
  },
  lamapenugasan: {
    type: String,
    required: true,
  },
  alasanpenugasan: {
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

module.exports = mongoose.model("Penugasan", penugasanSchema);
