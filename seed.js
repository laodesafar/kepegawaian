var seeder = require("mongoose-seed");
var mongoose = require("mongoose");

// Connect to MongoDB via Mongoose
seeder.connect(
  "mongodb://localhost:27017/db_siadik",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  function () {
    // Load Mongoose models
    seeder.loadModels([
      "./models/Golongan",
      "./models/Jabatan",
      "./models/JenisPengabdi",
      "./models/Keluarga",
      "./models/NaikGolongan",
      "./models/NaikJabatan",
      "./models/Pendidikan",
      "./models/Pengabdi",
      "./models/UnitKerja",
      "./models/User",
    ]);

    // Clear specified collections
    seeder.clearModels(
      [
        "Golongan",
        "Jabatan",
        "JenisPengabdi",
        "Keluarga",
        "NaikGolongan",
        "NaikJabatan",
        "Pendidikan",
        "Pengabdi",
        "UnitKerja",
        "User",
      ],
      function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
          seeder.disconnect();
        });
      }
    );
  }
);

var data = [
  // start golongan
  {
    model: "Golongan",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5faba8d07637c025f4d20c62"),
        golongan: "IA",
        pangkat: "Juru Muda",
      },
      {
        _id: mongoose.Types.ObjectId("5faba8e37637c025f4d20c63"),
        golongan: "IB",
        pangkat: "Juru Muda Tingkat 1",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c64"),
        golongan: "IC",
        pangkat: "Juru",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c65"),
        golongan: "ID",
        pangkat: "Juru Tingkat 1",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c66"),
        golongan: "IID",
        pangkat: "Pengatur Muda",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c67"),
        golongan: "IIB",
        pangkat: "Pengatur Muda Tingkat 1",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c68"),
        golongan: "IIC",
        pangkat: "Pengatur",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c69"),
        golongan: "IID",
        pangkat: "Pengatur Tingkat 1",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c6a"),
        golongan: "IIIA",
        pangkat: "Juru Muda",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c6b"),
        golongan: "IIIB",
        pangkat: "Penata Muda Tingkat 1",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c6c"),
        golongan: "IIIC",
        pangkat: "Penata",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c6d"),
        golongan: "IIID",
        pangkat: "Penata Tingkat 1",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c6e"),
        golongan: "IVA",
        pangkat: "Pembina",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c6f"),
        golongan: "IVB",
        pangkat: "Pembina Tingkat 1",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c70"),
        golongan: "IVC",
        pangkat: "Pembina Utama",
      },
      {
        _id: mongoose.Types.ObjectId("5faba9087637c025f4d20c71"),
        golongan: "IVD",
        pangkat: "Pembina Utama Madya",
      },
    ],
  },
  // end golongan
  // start jabatan
  {
    model: "Jabatan",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5f9108cdb9f6df2fd8566b0a"),
        jabatan: "Kepala Sekretartiat",
      },
      {
        _id: mongoose.Types.ObjectId("5f9108cdb9f6df2fd8566b0b"),
        jabatan: "Pengawas",
      },
      {
        _id: mongoose.Types.ObjectId("5f9108cdb9f6df2fd8566b0c"),
        jabatan: "Renbang",
      },
      {
        _id: mongoose.Types.ObjectId("5f9108cdb9f6df2fd8566b0d"),
        jabatan: "Kepala Sekolah",
      },
    ],
  },
  // end golongan
  // start jenis Pengabdi
  {
    model: "JenisPengabdi",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5fab8a242ad68c01c89011da"),
        jenisPengabdi: "Pegawai Honorer",
        jenis: false,
        bagian: "Non Akademik",
      },
      {
        _id: mongoose.Types.ObjectId("5fab8a242ad68c01c89011db"),
        jenisPengabdi: "Pegawai Tetap",
        jenis: true,
        bagian: "Non Akademik",
      },
      {
        _id: mongoose.Types.ObjectId("5fab8a242ad68c01c89011dc"),
        jenisPengabdi: "Guru Honorer",
        jenis: false,
        bagian: "Akademik",
      },
      {
        _id: mongoose.Types.ObjectId("5fab8a242ad68c01c89011dd"),
        jenisPengabdi: "Guru Tetap",
        jenis: true,
        bagian: "Akademik",
      },
    ],
  },
  // end jenispengabdi
  // start keluarga
  {
    model: "Keluarga",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5fbf0b092954061a148d8adc"),
        pengabdiId: mongoose.Types.ObjectId("5fb37cc62a334c1954e122fb"),
        nik: "1233444",
        nama: "Ronaldo",
        jenisKelamin: "Laki - Laki",
        tempatLahir: "Madeira",
        tanggalLahir: "2020-11-07T00:00:00.000+00:00",
        pendidikan: "Stata I",
        pekerjaan: "Staf Kepegawaian Dikdasmen",
        hubungan: "Anak",
      },
    ],
  },
  // end keluarga

  // start Naik Golongan
  {
    model: "NaikGolongan",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5fbf0ab12954061a148d8adb"),
        isAktif: false,
        golonganId: mongoose.Types.ObjectId("5faba9087637c025f4d20c6b"),
        pengabdiId: mongoose.Types.ObjectId("5fc854a2e5d7c008f8c0f55e"),
        tmtGolongan: "2020-11-05T00:00:00.000+00:00",
        pejabatPengesah: "Suyatmo, S.Ag, M.Pd",
        nomorSk: "111",
        tanggalSk: "2020-11-04T00:00:00.000+00:00",
        fotoUrl: "images/1606355633478.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("5fbf1a552b0f1131202c36df"),
        isAktif: true,
        golonganId: mongoose.Types.ObjectId("5faba9087637c025f4d20c6c"),
        pengabdiId: mongoose.Types.ObjectId("5fc854a2e5d7c008f8c0f55e"),
        tmtGolongan: "2020-11-07T00:00:00.000+00:00",
        pejabatPengesah: "Suyatmo, S.Ag, M.Pd",
        nomorSk: "111",
        tanggalSk: "2020-11-04T00:00:00.000+00:00",
        fotoUrl: "images/1606359637354.jpeg",
      },
      {
        _id: mongoose.Types.ObjectId("5fc9c08970f3f32430facd09"),
        isAktif: true,
        golonganId: mongoose.Types.ObjectId("5faba9087637c025f4d20c66"),
        pengabdiId: mongoose.Types.ObjectId("5fc848a1e5d7c008f8c0f55d"),
        tmtGolongan: "2020-11-01T00:00:00.000+00:00",
        pejabatPengesah: "Suyatmo, S.Ag, M.Pd",
        nomorSk: "3123yugh",
        tanggalSk: "2020-11-05T00:00:00.000+00:00",
        fotoUrl: "images/1607057545438.jpg",
      },
    ],
  },
  // end Naik Golongan
  // start Naik Jabatan
  {
    model: "NaikJabatan",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5fbf3457bb4bdd2ed8f789e2"),
        isAktif: true,
        tanggalSk: "2020-11-26T00:00:00.000+00:00",
        golonganId: mongoose.Types.ObjectId("5f9108cdb9f6df2fd8566b0b"),
        pengabdiId: mongoose.Types.ObjectId("5fb37cc62a334c1954e122fb"),
        tmtGolongan: "2020-11-03T00:00:00.000+00:00",
        pejabatPengesah: "Suyatmo, S.Ag, M.Pd",
        nomorSk: "111",
        tmtJabatanAwal: "2020-11-26T00:00:00.000+00:00",
        tmtJabatanAkhir: "2022-11-26T00:00:00.000+00:00",
        fotoUrl: "images/1606366295154.jpg",
      },
    ],
  },
  // end Naik Jabatan

  // Start Pendidikan
  {
    model: "Pendidikan",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5fbcab7a9f32a628e084e8ad"),
        isAktif: true,
        pengabdiId: mongoose.Types.ObjectId("5fc5ceb3ed756930681debae"),
        tingkat: "SMA",
        nama: "SMK Negeri 2 Pasarwajo",
        lokasi: "Buton",
        jurusan: "Teknik Komputer dan Jaringan",
        nomorIjazah: "1221/2132121",
        tanggalIjazah: "2020-11-09T00:00:00.000+00:00",
        namaPimpinan: "La Ode Safar",
        fotoUrl: "images/1606200186777.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("5fbdbc9045dd52154050c14e"),
        isAktif: true,
        pengabdiId: mongoose.Types.ObjectId("5fbcaddf9f32a628e084e8ae"),
        tingkat: "SMA",
        nama: "SMEA",
        lokasi: "Semarang",
        jurusan: "IPA",
        nomorIjazah: "11/2112/2332",
        tanggalIjazah: "2020-11-04T00:00:00.000+00:00",
        namaPimpinan: "La Ode Safar",
        fotoUrl: "images/1606270096374.jpg",
      },
    ],
  },
  // End Pendidikan

  // Start Pengabdi
  {
    model: "Pengabdi",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5fbcaddf9f32a628e084e8ae"),
        agama: "Katolik",
        unitId: mongoose.Types.ObjectId("5faba7967637c025f4d20c5e"),
        jenisPengabdiId: mongoose.Types.ObjectId("5fab8a242ad68c01c89011dd"),
        keluargaId: [],
        pendidikanId: mongoose.Types.ObjectId("5fbdbc9045dd52154050c14e"),
        nip: "13123214156",
        nama: "Subuh Ajianto",
        tempatLahir: "Banjarnegara",
        tanggalLahir: "1965-01-05T00:00:00.000Z",
        jenisKelamin: "Laki - Laki",
        golonganDarah: "A",
        statusPernikahan: "Nikah",
        alamat: "",
        telpon: "085396922978",
        email: "laodesafar94@gmail.com",
        tmtCapeg: null,
        tmtGolongan: "2020-11-05T00:00:00.000Z",
        naikGolonganId: [],
        naikJabatanId: [],
        tmtGaji: "2020-11-02T00:00:00.000Z",
        tmtKerja: "2020-11-04T00:00:00.000Z",
        mutasiId: mongoose.Types.ObjectId("600fb38df4f4ff2f9cd86d81"),
      },
      {
        _id: mongoose.Types.ObjectId("5fc5c18680964813cc3850c0"),
        agama: "Islam",
        unitId: mongoose.Types.ObjectId("5fb34bce732dd929dcf32e79"),
        jenisPengabdiId: mongoose.Types.ObjectId("5fab8a242ad68c01c89011da"),
        keluargaId: [],
        pendidikanId: mongoose.Types.ObjectId("5fbdbc9045dd52154050c14e"),
        nip: "13123214r",
        nama: "Kameswara Yulindasari",
        tempatLahir: "Pekalongan",
        tanggalLahir: "2020-12-03T00:00:00.000Z",
        jenisKelamin: "Perempuan",
        golonganDarah: "A",
        alamat: "",
        telpon: "081575615774",
        email: "laodesafar94@gmail.com",
        tmtCapeg: null,
        tmtGolongan: null,
        naikGolonganId: [],
        naikJabatanId: [],
        tmtGaji: null,
        tmtKerja: "2020-12-02T00:00:00.000Z",
      },
      {
        _id: mongoose.Types.ObjectId("5fc5ceb3ed756930681debae"),
        agama: "Islam",
        unitId: mongoose.Types.ObjectId("5fb34bce732dd929dcf32e79"),
        jenisPengabdiId: mongoose.Types.ObjectId("5fab8a242ad68c01c89011db"),
        keluargaId: [],
        pendidikanId: [],
        nip: "13123214",
        nama: "La Ode Safar",
        tempatLahir: "Dongkala",
        tanggalLahir: "1964-07-30T00:00:00.000Z",
        jenisKelamin: "Laki - Laki",
        golonganDarah: "B",
        alamat: "dfdff",
        telpon: "081575615774",
        email: "laodesafar94@gmail.com",
        tmtGolongan: "2020-12-02T00:00:00.000Z",
        tmtGaji: "2020-12-02T00:00:00.000Z",
        tmtKerja: "2020-12-03T00:00:00.000Z",
      },
      {
        _id: mongoose.Types.ObjectId("5fc848a1e5d7c008f8c0f55d"),
        agama: "Islam",
        unitId: mongoose.Types.ObjectId("5fb34bce732dd929dcf32e79"),
        jenisPengabdiId: mongoose.Types.ObjectId("5fab8a242ad68c01c89011db"),
        keluargaId: [],
        pendidikanId: [],
        naikGolonganId: mongoose.Types.ObjectId("5fc9c08970f3f32430facd09"),
        nip: "12332345666",
        nama: "Budi Kurniawan",
        tempatLahir: "Semarang",
        tanggalLahir: "1979-01-09T00:00:00.000Z",
        jenisKelamin: "Laki - Laki",
        statusPernikahan: "Nikah",
        golonganDarah: "B",
        alamat: "085396922978",
        telpon: "085866772445",
        email: "anugrahramadhan1824@gmail.com",
        tmtGolongan: "2020-12-04T00:00:00.000Z",
        tmtGaji: "2020-12-04T00:00:00.000Z",
        tmtKerja: "2020-09-17T00:00:00.000Z",
      },
      {
        _id: mongoose.Types.ObjectId("5fc854a2e5d7c008f8c0f55e"),
        agama: "Islam",
        unitId: mongoose.Types.ObjectId("5faba7727637c025f4d20c5c"),
        jenisPengabdiId: mongoose.Types.ObjectId("5fab8a242ad68c01c89011dd"),
        keluargaId: [],
        pendidikanId: [],
        naikGolonganId: [
          mongoose.Types.ObjectId("5fbf1a552b0f1131202c36df"),
          mongoose.Types.ObjectId("5fbf0ab12954061a148d8adb"),
        ],
        nip: "1094068",
        nama: "Wiwin Budairy S.Pd.I",
        tempatLahir: "Boyolali",
        tanggalLahir: "1964-10-01T00:00:00.000Z",
        jenisKelamin: "Laki - Laki",
        statusPernikahan: "Nikah",
        golonganDarah: "B",
        alamat:
          "Jl. Selomulyo Mukti Barat VI/104A Tlogomulyo Pedurungan Semarang",
        telpon: "085866772445",
        email: "wiwinbudairy@gmail.com",
        tmtGolongan: "1994-10-01T00:00:00.000Z",
        tmtGaji: "1994-05-01T00:00:00.000Z",
        tmtKerja: "1994-01-01T00:00:00.000Z",
        fotoUrl: "images/1606964386404.jpg",
      },
    ],
  },
  {
    model: "UnitKerja",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5faba72d7637c025f4d20c56"),
        unit: "TK Islam Sultan Agung 1",
        tingkat: "KB / TK",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("5faba7387637c025f4d20c57"),
        unit: "TK Islam Sultan Agung 2",
        tingkat: "KB / TK",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("5faba7417637c025f4d20c58"),
        unit: "TK Islam Sultan Agung 4",
        tingkat: "KB / TK",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("5faba74c7637c025f4d20c59"),
        unit: "SD Islam Sultan Agung 1",
        tingkat: "SD",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("5faba75f7637c025f4d20c5a"),
        unit: "SD Islam Sultan Agung 2",
        tingkat: "SD",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("5faba7687637c025f4d20c5b"),
        unit: "SD Islam Sultan Agung 3",
        tingkat: "SD",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("5faba7727637c025f4d20c5c"),
        unit: "SD Islam Sultan Agung 4",
        tingkat: "SD",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("5faba78a7637c025f4d20c5d"),

        unit: "SMP Islam Sultan Agung 1",
        tingkat: "SMP",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("5faba7967637c025f4d20c5e"),

        unit: "SMP Islam Sultan Agung 4",
        tingkat: "SMP",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("5faba79f7637c025f4d20c5f"),

        unit: "SMA Islam Sultan Agung 1",
        tingkat: "SMA",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("5faba7b07637c025f4d20c60"),
        unit: "SMA Islam Sultan Agung 3",
        tingkat: "SMA",
        __v: 0,
      },
      {
        _id: mongoose.Types.ObjectId("5fb34bce732dd929dcf32e79"),
        unit: "Sekretariat Dikdasmen YBWSA",
        tingkat: "Sekretariat",
        __v: 2,
      },
    ],
  },
  {
    model: "User",
    documents: [
      {
        id: mongoose.Types.ObjectId("5e96cbe292b97300fc903345"),
        username: "admin",
        password: "rahasia",
      },
    ],
  },
];
