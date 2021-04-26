const router = require("express").Router();
const adminControler = require("../controllers/adminController");
const { upload } = require("../middlewares/multer");
const auth = require("../middlewares/auth");

router.get("/signin", adminControler.viewSignin);
router.post("/signin", adminControler.actionSignin);
router.use(auth);
router.get("/logout", adminControler.actionLogout);
router.get("/dashboard", adminControler.viewDashboard);
// router data master
router.get("/golongan", adminControler.viewGolongan);
router.post("/golongan", adminControler.tambahGolongan);
router.put("/golongan", adminControler.editGolongan);
router.delete("/golongan/:id", adminControler.deleteGolongan);
// endpoint jabatan
router.get("/jabatan", adminControler.viewJabatan);
router.post("/jabatan", adminControler.tambahJabatan);
router.put("/jabatan", adminControler.editJabatan);
router.delete("/jabatan/:id", adminControler.deleteJabatan);
// endpoint jenispengabdi
router.get("/jenispengabdi", adminControler.viewJenisPengabdi);
router.post("/jenispengabdi", adminControler.tambahJenisPengabdi);
router.put("/jenispengabdi", adminControler.editJenisPengabdi);
router.delete("/jenispengabdi/:id", adminControler.deleteJenisPengabdi);
//endpoint unit
router.get("/unit", adminControler.viewUnit);
router.post("/unit", adminControler.tambahUnit);
router.put("/unit", adminControler.editUnit);
router.delete("/unit/:id", adminControler.deleteUnit);

//endpoint Pengabdi
router.get("/pengabdi", adminControler.viewPengabdi);
router.post("/pengabdi", upload, adminControler.tambahPengabdi);
router.put("/pengabdi", upload, adminControler.editPengabdi);
router.delete("/pengabdi/:id", adminControler.deletePengabdi);
//endpoint Detail Pengabdi
router.get("/pengabdi/detail-pengabdi/:id", adminControler.ViewDetailPengabdi);
//endpoint Detail Keluarga
router.post("/pengabdi/keluarga/:id", adminControler.tambahKeluarga);
router.put("/pengabdi/keluarga/:id", adminControler.editKeluarga);
router.delete(
  "/pengabdi/keluarga/:idPengabdi/:id",
  adminControler.deleteKeluarga
);
//endpoint Detail Pendidikan
router.post(
  "/pengabdi/pendidikan/:id",
  upload,
  adminControler.tambahPendidikan
);
router.put("/pengabdi/pendidikan/:id", upload, adminControler.editPendidikan);
router.put("/pengabdi/pendidikan/status/:id", adminControler.statusPendidikan);
router.delete(
  "/pengabdi/pendidikan/:idPengabdi/:id",
  adminControler.deletePendidikan
);

//endpoint Naik Golongan
router.post(
  "/pengabdi/golongan/:id",
  upload,
  adminControler.tambahNaikGolongan
);
router.put("/pengabdi/golongan/:id", upload, adminControler.editNaikGolongan);
router.put("/pengabdi/golongan/status/:id", adminControler.statusNaikGolongan);
router.delete(
  "/pengabdi/golongan/:idPengabdi/:id",
  adminControler.deleteNaikGolongan
);

//endpoint Naik Jabatan
router.post("/pengabdi/jabatan/:id", upload, adminControler.tambahNaikJabatan);
router.put("/pengabdi/jabatan/:id", upload, adminControler.editNaikJabatan);
router.put("/pengabdi/jabatan/status/:id", adminControler.statusNaikJabatan);
router.delete(
  "/pengabdi/jabatan/:idPengabdi/:id",
  adminControler.deleteNaikJabatan
);

router.get("/penggajian", adminControler.viewPenggajian);
router.get("/mutasi", adminControler.viewMutasi);
router.get("/pengguna", adminControler.viewPengguna);
router.get("/akun", adminControler.viewAkun);

module.exports = router;
