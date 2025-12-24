import express from 'express';
import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, doctorProfile, loginDoctor, registerDoctor, updateDoctorProfile } from '../controllers/doctorController.js';
import authDoc from '../middlewares/authDoc.js';


const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.post('/register', registerDoctor)
doctorRouter.get('/appointments', authDoc, appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoc, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoc, appointmentCancel)
doctorRouter.get('/dashboard', authDoc, doctorDashboard)
doctorRouter.get('/profile', authDoc, doctorProfile)
doctorRouter.post('/update-profile', authDoc, updateDoctorProfile)

export default doctorRouter