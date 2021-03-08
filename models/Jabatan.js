const mongoose = require("mongoose");

const jabatanSchema = new mongoose.Schema({
  jabatan: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Jabatan", jabatanSchema);
