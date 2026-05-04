import express from "express";

import {
  patientRegister,
  login,
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
} from "../controller/userController.js";

import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

// ---------------- AUTH ROUTES ---------------- //
router.post("/patient/register", patientRegister);
router.post("/login", login);

// ---------------- ADMIN ROUTES ---------------- //
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

// ---------------- DOCTOR ROUTES ---------------- //
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
router.get("/doctors", getAllDoctors);

// ---------------- PATIENT ROUTES ---------------- //
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);

export default router;