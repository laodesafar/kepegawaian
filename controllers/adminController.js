const Golongan = require("../models/Golongan");
const Jabatan = require("../models/Jabatan");
const JenisPengabdi = require("../models/JenisPengabdi");
const Pengabdi = require("../models/Pengabdi");
const Unit = require("../models/UnitKerja");
const Keluarga = require("../models/Keluarga");
const Pendidikan = require("../models/Pendidikan");
const NaikGolongan = require("../models/NaikGolongan");
const NaikJabatan = require("../models/NaikJabatan");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  viewDashboard: async (req, res) => {
    try {
      const unit = await Unit.find();
      const golongan = await Golongan.find();
      const pengabdi = await Pengabdi.find()
        .populate({ path: "unitId", select: "id unit" })
        .populate({
          path: "jenisPengabdiId",
          select: "id jenisPengabdi bagian jenis",
        })
        .populate({ path: "golonganId", select: "id golongan pangkat" })
        .populate("keluargaId")
        .populate("pendidikanId")
        .populate({ path: "naikGolonganId", populate: { path: "golonganId" } })
        .populate({ path: "naikJabatanId", populate: { path: "jabatanId" } });

      function bedaBulan(d1, d2) {
        var bulan;
        if (d1.getTime() > d2.getTime()) {
          bulan = (d2.getFullYear() - d1.getFullYear()) * 12;
          bulan -= d1.getMonth();
          bulan += d2.getMonth();
          return bulan <= 0 ? 0 : bulan;
        }
      }

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/dashboard/view_dashboard", {
        title: "SiAdik Dikdasmen | Dashboard",
        alert,
        pengabdi,
        unit,
        golongan,
        bedaBulan,
      });
    } catch (error) {
      res.redirect("/admin/golongan");
    }
  },

  // Data Master
  viewGolongan: async (req, res) => {
    try {
      const golongan = await Golongan.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/master/view_golongan", {
        golongan,
        alert,
        title: "SiAdik Dikdasmen | Golongan",
      });
    } catch (error) {
      res.redirect("/admin/golongan");
    }
  },

  tambahGolongan: async (req, res) => {
    try {
      const { golongan, pangkat } = req.body;
      await Golongan.create({
        golongan,
        pangkat,
      });
      req.flash("alertMessage", "Golongan berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect("/admin/golongan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/golongan");
    }
  },

  editGolongan: async (req, res) => {
    try {
      const { id, pangkat, golongan } = req.body;
      const golonganEdit = await Golongan.findOne({ _id: id });
      golonganEdit.pangkat = pangkat;
      golonganEdit.golongan = golongan;
      await golonganEdit.save();
      req.flash("alertMessage", "Jabatan berhasil diupdate");
      req.flash("alertStatus", "success");
      res.redirect("/admin/golongan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/golongan");
    }
  },

  deleteGolongan: async (req, res) => {
    try {
      const { id } = req.params;
      const golonganDelete = await Golongan.findOne({ _id: id });
      await golonganDelete.remove();
      req.flash("alertMessage", "Golongan berhasil dihapus");
      req.flash("alertStatus", "success");
      res.redirect("/admin/golongan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/golongan");
    }
  },

  viewJabatan: async (req, res) => {
    try {
      const jabatan = await Jabatan.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/master/view_jabatan", {
        jabatan,
        alert,
        title: "SiAdik Dikdasmen | Jabatan",
      });
    } catch (error) {
      res.redirect("/admin/jabatan");
    }
  },

  tambahJabatan: async (req, res) => {
    try {
      const { jabatan } = req.body;
      await Jabatan.create({ jabatan });
      req.flash("alertMessage", "Jabatan berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect("/admin/jabatan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/jabatan");
    }
  },

  editJabatan: async (req, res) => {
    try {
      const { id, jabatan } = req.body;
      const jabatanEdit = await Jabatan.findOne({ _id: id });
      jabatanEdit.jabatan = jabatan;
      await jabatanEdit.save();
      req.flash("alertMessage", "Jabatan berhasil diupdate");
      req.flash("alertStatus", "success");
      res.redirect("/admin/jabatan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/jabatan");
    }
  },

  deleteJabatan: async (req, res) => {
    try {
      const { id } = req.params;
      const jabatanDelete = await Jabatan.findOne({ _id: id });
      await jabatanDelete.remove();
      req.flash("alertMessage", "Jabatan berhasil dihapus");
      req.flash("alertStatus", "success");
      res.redirect("/admin/jabatan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/jabatan");
    }
  },

  viewJenisPengabdi: async (req, res) => {
    const jenisPengabdi = await JenisPengabdi.find();
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };
    res.render("admin/master/view_jenispengabdi", {
      jenisPengabdi,
      alert,
      title: "SiAdik Dikdasmen | Jenis Pengabdi",
    });
  },

  tambahJenisPengabdi: async (req, res) => {
    try {
      const { jenisPengabdi, bagian, jenis } = req.body;
      await JenisPengabdi.create({ jenisPengabdi, bagian, jenis });
      req.flash("alertMessage", "Jenis Pengabdi berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect("/admin/jenispengabdi");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/jenispengabdi");
    }
  },

  editJenisPengabdi: async (req, res) => {
    try {
      const { id, jenisPengabdi, bagian, jenis } = req.body;
      const jenisPengabdiEdit = await JenisPengabdi.findOne({ _id: id });
      jenisPengabdiEdit.jenisPengabdi = jenisPengabdi;
      jenisPengabdiEdit.bagian = bagian;
      jenisPengabdiEdit.jenis = jenis;
      await jenisPengabdiEdit.save();
      req.flash("alertMessage", "Jenis Pengabdi berhasil diupdate");
      req.flash("alertStatus", "success");
      res.redirect("/admin/jenispengabdi");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/jenispengabdi");
    }
  },

  deleteJenisPengabdi: async (req, res) => {
    try {
      const { id } = req.params;
      const jenisPengabdiDelete = await JenisPengabdi.findOne({ _id: id });
      await jenisPengabdiDelete.remove();
      req.flash("alertMessage", "Jenis Jabatan berhasil dihapus");
      req.flash("alertStatus", "success");
      res.redirect("/admin/jenispengabdi");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/jenispengabdi");
    }
  },

  viewUnit: async (req, res) => {
    try {
      const unit = await Unit.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/master/view_unit", {
        unit,
        alert,
        title: "SiAdik Dikdasmen | Unit",
      });
    } catch (error) {
      res.redirect("/admin/unit");
    }
  },

  tambahUnit: async (req, res) => {
    try {
      const { unit, tingkat } = req.body;
      await Unit.create({
        unit,
        tingkat,
      });
      req.flash("alertMessage", "Unit berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect("/admin/unit");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/unit");
    }
  },

  editUnit: async (req, res) => {
    try {
      const { id, unit, tingkat } = req.body;
      const unitEdit = await Unit.findOne({ _id: id });
      unitEdit.unit = unit;
      unitEdit.tingkat = tingkat;
      await unitEdit.save();
      req.flash("alertMessage", "Unit berhasil diupdate");
      req.flash("alertStatus", "success");
      res.redirect("/admin/unit");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/unit");
    }
  },

  deleteUnit: async (req, res) => {
    try {
      const { id } = req.params;
      const unitDelete = await Unit.findOne({ _id: id });
      await unitDelete.remove();
      req.flash("alertMessage", "Unit berhasil dihapus");
      req.flash("alertStatus", "success");
      res.redirect("/admin/unit");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/unit");
    }
  },

  // Data Pengabdi
  viewPengabdi: async (req, res) => {
    try {
      const pengabdi = await Pengabdi.find()
        .populate({ path: "unitId", select: "id unit" })
        .populate({
          path: "jenisPengabdiId",
          select: "id jenisPengabdi bagian jenis ",
        })
        .populate({ path: "golonganId", select: "id golongan" });
      const unit = await Unit.find();
      const golongan = await Golongan.find();
      const jenisPengabdi = await JenisPengabdi.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/pengabdi/view_pengabdi", {
        pengabdi,
        unit,
        jenisPengabdi,
        golongan,
        alert,
        title: "SiAdik Dikdasmen | Pengabdi",
      });
    } catch (error) {
      res.redirect("/admin/pengabdi");
    }
  },

  tambahPengabdi: async (req, res) => {
    try {
      const {
        nip,
        nama,
        tempatLahir,
        tanggalLahir,
        agama,
        jenisKelamin,
        golonganDarah,
        statusPernikahan,
        alamat,
        telpon,
        email,
        tmtGolongan,
        tmtGaji,
        tmtKerja,
        jenisPengabdiId,
        unitId,
        golonganId,
      } = req.body;

      if (req.file == undefined) {
        const pengabdi = await Pengabdi.create({
          nip,
          nama,
          tempatLahir,
          tanggalLahir,
          agama,
          jenisKelamin,
          golonganDarah,
          statusPernikahan,
          alamat,
          telpon,
          email,
          tmtGolongan,
          tmtGaji,
          tmtKerja,
          jenisPengabdiId,
          unitId,
          golonganId,
        });

        await pengabdi.save();
      } else {
        const pengabdi = await Pengabdi.create({
          nip,
          nama,
          tempatLahir,
          tanggalLahir,
          agama,
          jenisKelamin,
          golonganDarah,
          statusPernikahan,
          alamat,
          telpon,
          email,
          tmtGolongan,
          tmtGaji,
          tmtKerja,
          jenisPengabdiId,
          unitId,
          golonganId,
          fotoUrl: `images/${req.file.filename}`,
        });
        await pengabdi.save();
      }

      req.flash("alertMessage", "Pengabdi berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect("/admin/pengabdi");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/pengabdi");
    }
  },

  editPengabdi: async (req, res) => {
    try {
      const {
        id,
        nip,
        nama,
        tempatLahir,
        tanggalLahir,
        agama,
        jenisKelamin,
        golonganDarah,
        statusPernikahan,
        alamat,
        telpon,
        email,
        tmtGolongan,
        tmtGaji,
        tmtKerja,
        jenisPengabdiId,
        unitId,
      } = req.body;
      const pengabdi = await Pengabdi.findOne({ _id: id });
      if (req.file == undefined) {
        pengabdi.nip = nip;
        pengabdi.nama = nama;
        pengabdi.tempatLahir = tempatLahir;
        pengabdi.tanggalLahir = tanggalLahir;
        pengabdi.agama = agama;
        pengabdi.jenisKelamin = jenisKelamin;
        pengabdi.golonganDarah = golonganDarah;
        pengabdi.statusPernikahan = statusPernikahan;
        pengabdi.alamat = alamat;
        pengabdi.telpon = telpon;
        pengabdi.email = email;
        pengabdi.tmtGolongan = tmtGolongan;
        pengabdi.tmtGaji = tmtGaji;
        pengabdi.tmtKerja = tmtKerja;
        pengabdi.jenisPengabdiId = jenisPengabdiId;
        pengabdi.unitId = unitId;
        await pengabdi.save();
        req.flash("alertMessage", "Pengabdi berhasil diupdate");
        req.flash("alertStatus", "success");
        res.redirect("/admin/pengabdi");
      } else {
        if (pengabdi.fotoUrl) {
          await fs.unlink(path.join(`public/${pengabdi.fotoUrl}`));
        }
        pengabdi.nip = nip;
        pengabdi.nama = nama;
        pengabdi.tempatLahir = tempatLahir;
        pengabdi.tanggalLahir = tanggalLahir;
        pengabdi.agama = agama;
        pengabdi.jenisKelamin = jenisKelamin;
        pengabdi.golonganDarah = golonganDarah;
        pengabdi.statusPernikahan = statusPernikahan;
        pengabdi.alamat = alamat;
        pengabdi.telpon = telpon;
        pengabdi.email = email;
        pengabdi.tmtGolongan = tmtGolongan;
        pengabdi.tmtGaji = tmtGaji;
        pengabdi.tmtKerja = tmtKerja;
        pengabdi.jenisPengabdiId = jenisPengabdiId;
        pengabdi.unitId = unitId;
        pengabdi.fotoUrl = `images/${req.file.filename}`;
        await pengabdi.save();
        req.flash("alertMessage", "Pengabdi berhasil diupdate");
        req.flash("alertStatus", "success");
        res.redirect("/admin/pengabdi");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/pengabdi");
    }
  },

  deletePengabdi: async (req, res) => {
    try {
      const { id } = req.params;
      const pengabdi = await Pengabdi.findOne({ _id: id });
      if (pengabdi.fotoUrl) {
        await fs.unlink(path.join(`public/${pengabdi.fotoUrl}`));
      }
      await pengabdi.remove();
      req.flash("alertMessage", "Pengabdi berhasil dihapus");
      req.flash("alertStatus", "success");
      res.redirect("/admin/pengabdi");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/pengabdi");
    }
  },

  ViewDetailPengabdi: async (req, res) => {
    const { id } = req.params;
    try {
      const pengabdi = await Pengabdi.findOne({ _id: id })
        .populate({ path: "unitId", select: "id unit" })
        .populate({
          path: "jenisPengabdiId",
          select: "id jenisPengabdi bagian jenis",
        })
        .populate({ path: "golonganId", select: "id golongan pangkat" })
        .populate("keluargaId")
        .populate("pendidikanId")
        .populate({ path: "naikGolonganId", populate: { path: "golonganId" } })
        .populate({ path: "naikJabatanId", populate: { path: "jabatanId" } });
      const usia = () => {
        let tglLahir = pengabdi.tanggalLahir;
        let hariIni = new Date();
        let tahun = hariIni.getFullYear() - tglLahir.getFullYear();
        let bulan = "";
        let hari = "";

        if (hariIni.getMonth() >= tglLahir.getMonth())
          bulan = hariIni.getMonth() - tglLahir.getMonth();
        else {
          tahun--;
          bulan = 12 + hariIni.getMonth() - tglLahir.getMonth();
        }
        if (hariIni.getDate() >= tglLahir.getDate())
          hari = hariIni.getDate() - tglLahir.getDate();
        else {
          bulan--;
          hari = 30 + hariIni.getDate() - tglLahir.getDate();
          if (bulan < 0) {
            bulan = 11;
            tahun--;
          }
        }
        return `${tahun} Tahun ${bulan} Bulan ${hari} Hari`;
      };

      umur = usia();
      const golongan = await Golongan.find();
      const jabatan = await Jabatan.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      res.render("admin/pengabdi/detail_pengabdi/view_detail_pengabdi", {
        title: "SiAdik Dikdasmen | Detail Pengabdi",
        alert,
        pengabdi,
        golongan,
        jabatan,
        umur,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${id}`);
    }
  },

  tambahKeluarga: async (req, res) => {
    const { id } = req.params;
    try {
      const pengabdi = await Pengabdi.findOne({ _id: id });
      const {
        nik,
        nama,
        jenisKelamin,
        tempatLahir,
        tanggalLahir,
        pendidikan,
        pekerjaan,
        hubungan,
      } = req.body;
      const newKeluarga = {
        nik,
        nama,
        jenisKelamin,
        tempatLahir,
        tanggalLahir,
        pendidikan,
        pekerjaan,
        hubungan,
        pengabdiId: `${id}`,
      };

      const keluarga = await Keluarga.create(newKeluarga);
      await pengabdi.keluargaId.push({ _id: keluarga._id });
      await pengabdi.save();
      req.flash("alertMessage", "Keluarga berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${id}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${id}`);
    }
  },

  editKeluarga: async (req, res) => {
    const { idPengabdi } = req.body;
    try {
      const {
        id,
        nik,
        nama,
        jenisKelamin,
        tempatLahir,
        tanggalLahir,
        pendidikan,
        pekerjaan,
        hubungan,
      } = req.body;
      const keluargaEdit = await Keluarga.findOne({ _id: id });
      keluargaEdit.nik = nik;
      keluargaEdit.nama = nama;
      keluargaEdit.jenisKelamin = jenisKelamin;
      keluargaEdit.tempatLahir = tempatLahir;
      keluargaEdit.tanggalLahir = tanggalLahir;
      keluargaEdit.pendidikan = pendidikan;
      keluargaEdit.pekerjaan = pekerjaan;
      keluargaEdit.hubungan = hubungan;
      await keluargaEdit.save();
      req.flash("alertMessage", "Keluarga berhasil diupdate");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    }
  },

  deleteKeluarga: async (req, res) => {
    const { id, idPengabdi } = req.params;
    try {
      const pengabdi = await Pengabdi.findOne({ _id: idPengabdi });
      const keluarga = await Keluarga.findOne({ _id: id });
      await pengabdi.keluargaId.pull({ _id: id });
      pengabdi.save();
      await keluarga.remove();
      req.flash("alertMessage", "Keluarga berhasil dihapus");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    }
  },

  tambahPendidikan: async (req, res) => {
    const { id } = req.params;
    try {
      const pengabdi = await Pengabdi.findOne({ _id: id });
      const {
        tingkat,
        nama,
        lokasi,
        jurusan,
        nomorIjazah,
        tanggalIjazah,
        namaPimpinan,
      } = req.body;

      const newPendidikan = {
        tingkat,
        nama,
        lokasi,
        jurusan,
        nomorIjazah,
        tanggalIjazah,
        namaPimpinan,
        fotoUrl: `images/${req.file.filename}`,
        pengabdiId: `${id}`,
      };

      const pendidikan = await Pendidikan.create(newPendidikan);
      await pengabdi.pendidikanId.push({ _id: pendidikan._id });
      await pengabdi.save();
      req.flash("alertMessage", "Pendidikanberhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${id}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${id}`);
    }
  },

  editPendidikan: async (req, res) => {
    const { idPengabdi } = req.body;
    try {
      const {
        id,
        tingkat,
        nama,
        lokasi,
        jurusan,
        nomorIjazah,
        tanggalIjazah,
        namaPimpinan,
      } = req.body;
      const pendidikanEdit = await Pendidikan.findOne({ _id: id });

      if (req.file == undefined) {
        pendidikanEdit.tingkat = tingkat;
        pendidikanEdit.nama = nama;
        pendidikanEdit.lokasi = lokasi;
        pendidikanEdit.jurusan = jurusan;
        pendidikanEdit.nomorIjazah = nomorIjazah;
        pendidikanEdit.tanggalIjazah = tanggalIjazah;
        pendidikanEdit.namaPimpinan = namaPimpinan;

        await pendidikanEdit.save();
        req.flash("alertMessage", "Pendidikan berhasil diupdate");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
      } else {
        if (pendidikanEdit.fotoUrl) {
          await fs.unlink(path.join(`public/${pendidikanEdit.fotoUrl}`));
        }
        pendidikanEdit.tingkat = tingkat;
        pendidikanEdit.nama = nama;
        pendidikanEdit.lokasi = lokasi;
        pendidikanEdit.jurusan = jurusan;
        pendidikanEdit.nomorIjazah = nomorIjazah;
        pendidikanEdit.tanggalIjazah = tanggalIjazah;
        pendidikanEdit.namaPimpinan = namaPimpinan;
        pendidikanEdit.fotoUrl = `images/${req.file.filename}`;

        await pendidikanEdit.save();
        req.flash("alertMessage", "Pendidikan berhasil diupdate");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    }
  },

  statusPendidikan: async (req, res) => {
    const { idPengabdi } = req.body;
    try {
      const { id } = req.body;
      const pendidikanEdit = await Pendidikan.find();

      for (let i = 0; i < pendidikanEdit.length; i++) {
        if (pendidikanEdit[i].id == id) {
          pendidikanEdit[i].isAktif = true;
        } else if (
          pendidikanEdit[i].id != id &&
          pendidikanEdit[i].pengabdiId == idPengabdi
        ) {
          pendidikanEdit[i].isAktif = false;
        }
        await pendidikanEdit[i].save();
      }
      req.flash("alertMessage", "Pendidikan berhasil disetup");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    }
  },

  deletePendidikan: async (req, res) => {
    const { id, idPengabdi } = req.params;
    try {
      const pengabdi = await Pengabdi.findOne({ _id: idPengabdi });
      const pendidikan = await Pendidikan.findOne({ _id: id });
      await pengabdi.pendidikanId.pull({ _id: id });
      pengabdi.save();
      if (pendidikan.fotoUrl) {
        await fs.unlink(path.join(`public/${pendidikan.fotoUrl}`));
      }
      await pendidikan.remove();
      req.flash("alertMessage", "Pendidikan berhasil dihapus");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    }
  },

  tambahNaikGolongan: async (req, res) => {
    const { id } = req.params;
    try {
      const pengabdi = await Pengabdi.findOne({ _id: id });
      const {
        tmtGolongan,
        pejabatPengesah,
        nomorSk,
        tanggalSk,
        golonganId,
      } = req.body;

      const newNaikGolongan = {
        tmtGolongan,
        pejabatPengesah,
        nomorSk,
        tanggalSk,
        fotoUrl: `images/${req.file.filename}`,
        golonganId,
        pengabdiId: `${id}`,
      };

      const naikGolongan = await NaikGolongan.create(newNaikGolongan);
      await pengabdi.naikGolonganId.push({ _id: naikGolongan._id });
      await pengabdi.save();
      req.flash("alertMessage", "Golongan berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${id}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${id}`);
    }
  },

  editNaikGolongan: async (req, res) => {
    const { idPengabdi } = req.body;
    try {
      const {
        id,
        tmtGolongan,
        pejabatPengesah,
        nomorSk,
        tanggalSk,
        golonganId,
      } = req.body;
      const naikGolonganEdit = await NaikGolongan.findOne({ _id: id });

      if (req.file == undefined) {
        naikGolonganEdit.tmtGolongan = tmtGolongan;
        naikGolonganEdit.pejabatPengesah = pejabatPengesah;
        naikGolonganEdit.nomorSk = nomorSk;
        naikGolonganEdit.tanggalSk = tanggalSk;
        naikGolonganEdit.golonganId = golonganId;

        await naikGolonganEdit.save();
        req.flash("alertMessage", "Golongan berhasil diupdate");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
      } else {
        if (naikGolonganEdit.fotoUrl) {
          await fs.unlink(path.join(`public/${naikGolonganEdit.fotoUrl}`));
        }
        naikGolonganEdit.tmtGolongan = tmtGolongan;
        naikGolonganEdit.pejabatPengesah = pejabatPengesah;
        naikGolonganEdit.nomorSk = nomorSk;
        naikGolonganEdit.tanggalSk = tanggalSk;
        naikGolonganEdit.golonganId = golonganId;
        naikGolonganEdit.fotoUrl = `images/${req.file.filename}`;

        await naikGolonganEdit.save();
        req.flash("alertMessage", "Pendidikan berhasil diupdate");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    }
  },

  statusNaikGolongan: async (req, res) => {
    const { idPengabdi } = req.body;
    try {
      const { id } = req.body;
      const naikGolonganEdit = await NaikGolongan.find();

      for (let i = 0; i < naikGolonganEdit.length; i++) {
        if (naikGolonganEdit[i].id == id) {
          naikGolonganEdit[i].isAktif = true;
        } else if (
          naikGolonganEdit[i].id != id &&
          naikGolonganEdit[i].pengabdiId == idPengabdi
        ) {
          naikGolonganEdit[i].isAktif = false;
        }
        await naikGolonganEdit[i].save();
      }
      req.flash("alertMessage", "Golongan berhasil disetup");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    }
  },

  deleteNaikGolongan: async (req, res) => {
    const { id, idPengabdi } = req.params;
    try {
      const pengabdi = await Pengabdi.findOne({ _id: idPengabdi });
      const naikGolongan = await NaikGolongan.findOne({ _id: id });
      await pengabdi.naikGolonganId.pull({ _id: id });
      pengabdi.save();
      if (naikGolongan.fotoUrl) {
        await fs.unlink(path.join(`public/${naikGolongan.fotoUrl}`));
      }
      await naikGolongan.remove();
      req.flash("alertMessage", "Golongan berhasil dihapus");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    }
  },

  tambahNaikJabatan: async (req, res) => {
    const { id } = req.params;
    try {
      const pengabdi = await Pengabdi.findOne({ _id: id });
      const {
        nomorSk,
        tanggalSk,
        tmtJabatanAwal,
        tmtJabatanAkhir,
        jabatanId,
      } = req.body;

      const newNaikJabatan = {
        nomorSk,
        tanggalSk,
        tmtJabatanAwal,
        tmtJabatanAkhir,
        fotoUrl: `images/${req.file.filename}`,
        jabatanId,
        pengabdiId: `${id}`,
      };

      const naikJabatan = await NaikJabatan.create(newNaikJabatan);
      await pengabdi.naikJabatanId.push({ _id: naikJabatan._id });
      await pengabdi.save();
      req.flash("alertMessage", "Jabatan berhasil ditambahkan");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${id}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${id}`);
    }
  },

  editNaikJabatan: async (req, res) => {
    const { idPengabdi } = req.body;
    try {
      const {
        id,
        nomorSk,
        tanggalSk,
        tmtJabatanAwal,
        tmtJabatanAkhir,
        jabatanId,
      } = req.body;
      const naikJabatanEdit = await NaikJabatan.findOne({ _id: id });

      if (req.file == undefined) {
        naikJabatanEdit.nomorSk = nomorSk;
        naikJabatanEdit.tanggalSk = tanggalSk;
        naikJabatanEdit.tmtJabatanAwal = tmtJabatanAwal;
        naikJabatanEdit.tmtJabatanAkhir = tmtJabatanAkhir;
        naikJabatanEdit.jabatanId = jabatanId;

        await naikJabatanEdit.save();
        req.flash("alertMessage", "Jabatan berhasil diupdate");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
      } else {
        if (naikJabatanEdit.fotoUrl) {
          await fs.unlink(path.join(`public/${naikJabatanEdit.fotoUrl}`));
        }
        naikJabatanEdit.nomorSk = nomorSk;
        naikJabatanEdit.tanggalSk = tanggalSk;
        naikJabatanEdit.tmtJabatanAwal = tmtJabatanAwal;
        naikJabatanEdit.tmtJabatanAkhir = tmtJabatanAkhir;
        naikJabatanEdit.jabatanId = jabatanId;
        naikJabatanEdit.fotoUrl = `images/${req.file.filename}`;

        await naikJabatanEdit.save();
        req.flash("alertMessage", "Jabatan berhasil diupdate");
        req.flash("alertStatus", "success");
        res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    }
  },

  statusNaikJabatan: async (req, res) => {
    const { idPengabdi } = req.body;
    try {
      const { id } = req.body;
      const naikJabatanEdit = await NaikJabatan.find();

      for (let i = 0; i < naikJabatanEdit.length; i++) {
        if (naikJabatanEdit[i].id == id) {
          naikJabatanEdit[i].isAktif = true;
        } else if (
          naikJabatanEdit[i].id != id &&
          naikJabatanEdit[i].pengabdiId == idPengabdi
        ) {
          naikJabatanEdit[i].isAktif = false;
        }
        await naikJabatanEdit[i].save();
      }
      req.flash("alertMessage", "Jabatan berhasil disetup");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    }
  },

  deleteNaikJabatan: async (req, res) => {
    const { id, idPengabdi } = req.params;
    try {
      const pengabdi = await Pengabdi.findOne({ _id: idPengabdi });
      const naikJabatan = await NaikJabatan.findOne({ _id: id });
      await pengabdi.naikJabatanId.pull({ _id: id });
      pengabdi.save();
      if (naikJabatan.fotoUrl) {
        await fs.unlink(path.join(`public/${naikJabatan.fotoUrl}`));
      }
      await naikJabatan.remove();
      req.flash("alertMessage", "Jabatan berhasil dihapus");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/pengabdi/detail-pengabdi/${idPengabdi}`);
    }
  },

  viewPenggajian: (req, res) => {
    res.render("admin/penggajian/view_penggajian", {
      title: "SiAdik Dikdasmen | Penggajian",
    });
  },
  viewMutasi: (req, res) => {
    res.render("admin/mutasi/view_mutasi", {
      title: "SiAdik Dikdasmen | Mutasi",
    });
  },
  viewPengguna: (req, res) => {
    res.render("admin/pengguna/view_pengguna", {
      title: "SiAdik Dikdasmen | Pengguna",
    });
  },
  viewAkun: (req, res) => {
    res.render("admin/akun/view_akun", {
      title: "SiAdik Dikdasmen | Akun",
    });
  },
};
