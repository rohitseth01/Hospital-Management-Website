import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appointmentModel from './../models/appointmentModel.js';
import validator from 'validator';

// API for doctor Registration (self-signup)
const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality } = req.body;

    // Validation
    if (!name || !email || !password || !speciality) {
      return res.json({ success: false, message: "Please fill all required fields" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Check if doctor already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create doctor with default values for required fields
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      image: "https://via.placeholder.com/150", // Default placeholder image
      degree: "MBBS", // Default degree
      experience: "1 Year", // Default experience
      about: "New doctor on the platform", // Default about
      fees: 50, // Default fees
      address: { line1: "", line2: "" }, // Empty address
      date: Date.now(),
      available: false, // Not available until they complete profile
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    // Generate token
    const token = jwt.sign({ id: newDoctor._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, message: "Registration successful! Please complete your profile." });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for doctor Login
const loginDoctor = async (req, res) => {

  try {

    const { email, password } = req.body

    const doctor = await doctorModel.findOne({ email })

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" })
    }

    const isMatched = await bcrypt.compare(password, doctor.password)

    if (isMatched) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)

      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API to get doctor appointments for doctor panel

const appointmentsDoctor = async (req, res) => {
  try {

    // const {docId}=req.body
    const docId = req.docId;
    const appointments = await appointmentModel.find({ docId })

    res.json({ success: true, appointments })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {

  try {

    const docId = req.docId
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)
    if (appointmentData && appointmentData.docId === docId) {

      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
      return res.json({ success: true, message: 'Appointment Completed' })

    } else {
      return res.json({ success: false, message: 'Mark Failed' })
    }


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

//API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {

  try {

    const docId = req.docId
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)
    if (appointmentData && appointmentData.docId === docId) {

      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
      return res.json({ success: true, message: 'Appointment Cancelled' })

    } else {
      return res.json({ success: false, message: 'Cancellation Failed' })
    }


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

//API to get dashboard data for doctor panel

const doctorDashboard = async (req, res) => {

  try {

    const docId = req.docId
    const appointments = await appointmentModel.find({ docId })

    let earnings = 0

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount
      }
    })

    let patients = []

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId)
      }
    })

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointment: appointments.reverse().slice(0, 5)
    }

    res.json({ success: true, dashData })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API to get doctor profile for Doctor Panel

const doctorProfile = async (req, res) => {

  try {
    const docId = req.docId
    const profileData = await doctorModel.findById(docId).select('-password')

    res.json({ success: true, profileData })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API to get doctor profile data from Doctor Panel

const updateDoctorProfile = async (req, res) => {

  try {
    const docId = req.docId
    const { fees, address, available } = req.body

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

    res.json({ success: true, message: 'Profile Updated' })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export {
  changeAvailablity,
  doctorList,
  loginDoctor,
  registerDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile
};
