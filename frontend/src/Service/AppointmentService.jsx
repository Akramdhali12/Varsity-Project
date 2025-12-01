
import axiosInstance from "../Interceptor/AxiosInterceptor";

const scheduleAppointment = async (data) => {
  return axiosInstance.post("/appointment/schedule", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const cancelAppointment = async (id) => {
  return axiosInstance.put("/appointment/cancel/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getAppointment = async (id) => {
  return axiosInstance.get("/appointment/get/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getAppointmentDetails = async (id) => {
  return axiosInstance.get("/appointment/get/details/"+ id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
const getAppointmentsByPatient = async (patientId) => {
  return axiosInstance.get("/appointment/getAllByPatient/"+ patientId)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
const getAppointmentsByDoctor = async (doctorId) => {
  return axiosInstance.get("/appointment/getAllByDoctor/"+ doctorId)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

const createAppointmentReport = async (data) => {
  return axiosInstance.post("/appointment/report/create", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const isReportExists = async(appointmentId)=>{
  return axiosInstance.get('/appointment/report/isRecordExists/'+appointmentId)
      .then((response)=>response.data)
      .catch((error)=>{throw error;})
}
const getReportsByPatientId = async(patientId)=>{
  return axiosInstance.get('/appointment/report/getRecordsByPatientId/'+patientId)
      .then((response)=>response.data)
      .catch((error)=>{throw error;})
}
const getPrescriptionsByPatientId = async(patientId)=>{
  return axiosInstance.get('/appointment/report/getPrescriptionsByPatientId/'+patientId)
      .then((response)=>response.data)
      .catch((error)=>{throw error;})
}

const getAllPrescriptions = async()=>{
  return axiosInstance.get('/appointment/report/getAllPrescriptions')
      .then((response)=>response.data)
      .catch((error)=>{throw error;})
}

const getMedicinesByPrescriptionId = async(prescriptionId)=>{
  return axiosInstance.get('/appointment/report/getMedicinesByPrescriptionId/'+prescriptionId)
      .then((response)=>response.data)
      .catch((error)=>{throw error;})
}

const countAppointmentsByPatient = async (patientId) => {
  return axiosInstance.get("/appointment/countByPatient/"+ patientId)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

const countAppointmentsByDoctor = async (doctorId) => {
  return axiosInstance.get("/appointment/countByDoctor/"+ doctorId)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

const countAllAppointments = async () => {
  return axiosInstance.get("/appointment/visitCount")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
  }

const countReasonsByPatient = async (patientId) => {
  return axiosInstance.get("/appointment/countReasonsByPatient/"+ patientId)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

const countReasonsByDoctor = async (doctorId) => {
  return axiosInstance.get("/appointment/countReasonsByDoctor/"+ doctorId)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

const countAllReasons = async () => {
  return axiosInstance.get("/appointment/countReasons")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
  }

const getMedicinesConsumedByPatient = async (patientId) => {
  return axiosInstance.get("/appointment/getMedicinesByPatient/"+ patientId)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

const getTodaysAppointments = async () => {
  return axiosInstance.get("/appointment/today")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export { scheduleAppointment, cancelAppointment,
   getAppointment, getAppointmentDetails,
   getAppointmentsByPatient, getAppointmentsByDoctor, createAppointmentReport,
   isReportExists,getReportsByPatientId,getPrescriptionsByPatientId,getAllPrescriptions,
  getMedicinesByPrescriptionId, countAppointmentsByPatient,countAppointmentsByDoctor,
   countAllAppointments, countReasonsByPatient, countReasonsByDoctor, countAllReasons,
  getMedicinesConsumedByPatient, getTodaysAppointments };

