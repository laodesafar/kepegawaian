const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const mutasiSchema = new mongoose.Schema({
  jenisMutasi: {
    type: String,
    required: true,
  },
  nomorSk: {
    type: String,
    required: true,
  },
  tanggalMutasi: {
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

module.exports = mongoose.model("Mutasi", mutasiSchema);
