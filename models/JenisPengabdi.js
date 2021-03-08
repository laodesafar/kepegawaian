const mongoose = require("mongoose");

const jenisPengabdiSchema = new mongoose.Schema({
  jenisPengabdi: {
    type: String,
    required: true,
  },
  bagian: {
    type: String,
  },
  jenis: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("JenisPengabdi", jenisPengabdiSchema);
