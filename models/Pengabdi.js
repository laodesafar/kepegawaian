const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const pengabdiSchema = new mongoose.Schema({
  nip: {
    type: String,
    unique: true,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  tempatLahir: {
    type: String,
    required: true,
  },
  tanggalLahir: {
    type: Date,
    required: true,
  },
  agama: {
    type: String,
    default: "Islam",
  },
  jenisKelamin: {
    type: String,
    required: true,
  },
  golonganDarah: {
    type: String,
  },
  statusPernikahan: {
    type: String,
  },
  alamat: {
    type: String,
  },
  telpon: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fotoUrl: {
    type: String,
  },
  tmtGolongan: {
    type: Date,
  },
  tmtGaji: {
    type: Date,
  },
  tmtKerja: {
    type: Date,
  },
  unitId: [
    {
      type: ObjectId,
      ref: "UnitKerja",
    },
  ],
  jenisPengabdiId: [
    {
      type: ObjectId,
      ref: "JenisPengabdi",
    },
  ],
  keluargaId: [
    {
      type: ObjectId,
      ref: "Keluarga",
    },
  ],
  pendidikanId: [
    {
      type: ObjectId,
      ref: "Pendidikan",
    },
  ],
  naikGolonganId: [
    {
      type: ObjectId,
      ref: "NaikGolongan",
    },
  ],
  naikJabatanId: [
    {
      type: ObjectId,
      ref: "NaikJabatan",
    },
  ],
  mutasiId: [
    {
      type: ObjectId,
      ref: "Mutasi",
    },
  ],
});

module.exports = mongoose.model("Pengabdi", pengabdiSchema);
