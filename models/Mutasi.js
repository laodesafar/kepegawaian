const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const mutasiSchema = new mongoose.Schema({
  jenisMutasi: {
    type: String,
  },
  nomorSk: {
    type: String,
    required: true,
  },
  tanggalMutasi: {
    type: Date,
  },
  pengabdiId: [
    {
      type: ObjectId,
      ref: "Pengabdi",
    },
  ],
});

module.exports = mongoose.model("Mutasi", mutasiSchema);
