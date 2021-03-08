const mongoose = require("mongoose");

const unitKerjaSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true,
  },
  tingkat: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UnitKerja", unitKerjaSchema);
