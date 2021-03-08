const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const golonganSchema = new mongoose.Schema({
  pangkat: {
    type: String,
    required: true,
  },
  golongan: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Golongan", golonganSchema);
