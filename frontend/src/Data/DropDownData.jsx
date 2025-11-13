const bloodGroups = [
  { label: "A_POSITIVE", value: "A_POSITIVE" },
  { label: "A_NEGATIVE", value: "A_NEGATIVE" },
  { label: "B_POSITIVE", value: "B_POSITIVE" },
  { label: "B_NEGATIVE", value: "B_NEGATIVE" },
  { label: "AB_POSITIVE", value: "AB_POSITIVE" },
  { label: "AB_NEGATIVE", value: "AB_NEGATIVE" },
  { label: "O_POSITIVE", value: "O_POSITIVE" },
  { label: "O_NEGATIVE", value: "O_NEGATIVE" }
];

const doctorSpecializations = ["Cardiologist", "Dermatologist", "Neurologist", "Pediatrician", "Orthopedic Surgeon", "Gynecologist", "Oncologist", "Psychiatrist", "Ophthalmologist", "Dentist", "Endocrinologist", "Gastroenterologist", "Nephrologist", "Pulmonologist", "Radiologist", "Urologist", "ENT Specialist", "General Surgeon", "Physician", "Rheumatologist"];
const doctorDepartments = ["Cardiology", "Dermatology", "Neurology", "Pediatrics", "Orthopedics", "Gynecology", "Oncology", "Psychiatry", "Ophthalmology", "Dentistry", "Endocrinology", "Gastroenterology", "Nephrology", "Pulmonology", "Radiology", "Urology", "ENT", "General Surgery", "Internal Medicine", "Rheumatology", "Emergency", "Anesthesiology", "Pathology", "Hematology", "Physiotherapy"];

const appointmentReasons = [
  "General Checkup",
  "Follow-up Visit",
  "New Symptoms Consultation",
  "Prescription Refill",
  "Lab Test Review",
  "Vaccination",
  "Blood Test",
  "X-Ray or Imaging",
  "Physical Examination",
  "Chronic Disease Management",
  "Allergy Consultation",
  "Fever and Cold",
  "Cough or Sore Throat",
  "Headache or Migraine",
  "Back Pain",
  "Skin Rash or Irritation",
  "Stomach Pain or Indigestion",
  "Diabetes Management",
  "High Blood Pressure Check",
  "Pregnancy Checkup",
  "Pediatric Consultation",
  "Eye Checkup",
  "Dental Checkup",
  "ENT (Ear, Nose, Throat) Problem",
  "Post-Surgery Follow-up",
  "Mental Health Consultation",
  "Nutrition or Diet Advice",
  "Fitness or Weight Management",
  "Cardiology Consultation",
  "Orthopedic Consultation"
];

const symptoms = [
  "fever",
  "cough",
  "fatigue",
  "headache",
  "sore throat",
  "runny nose",
  "shortness of breath",
  "chest pain",
  "muscle aches",
  "joint pain",
  "loss of appetite",
  "nausea",
  "vomiting",
  "diarrhea",
  "dizziness",
  "chills",
  "sweating",
  "abdominal pain",
  "loss of taste",
  "loss of smell"
];

const tests = [
  "CBC",
  "Chest X-ray",
  "Urine Test",
  "Blood Sugar",
  "ECG",
  "Liver Function Test (LFT)",
  "Kidney Function Test (KFT)",
  "Lipid Profile",
  "Thyroid Function Test (TFT)",
  "CT Scan",
  "MRI",
  "Ultrasound",
  "Blood Pressure Measurement",
  "Pulse Oximetry",
  "COVID-19 Test",
  "Dengue Test",
  "Malaria Test",
  "Pregnancy Test",
  "Stool Test",
  "Eye Examination",
  "Hearing Test",
  "Allergy Test",
  "Vitamin D Test",
  "Hemoglobin Test"
];

const dosageFrequencies = [
  "1-0-1", // Morning and Night
  "1-1-1", // Morning, Afternoon, and Night
  "1-0-0", // Morning only
  "0-1-0", // Afternoon only
  "0-0-1", // Night only
  "1-1-0", // Morning and Afternoon
  "0-1-1", // Afternoon and Night
  "1-0-0 (before breakfast)",
  "0-0-1 (after dinner)",
  "1-0-1 (after meals)",
  "SOS", // As needed (if required)
  "BD",  // Twice daily
  "TDS", // Three times daily
  "OD",  // Once daily
  "HS",  // At bedtime
  "QID", // Four times daily
  "Alternate Days",
  "Weekly",
  "Monthly"
];
const freqMap={
  "1-0-0":1, 
  "0-1-0":1, 
  "0-0-1":1, 
  "1-0-1":2, 
  "0-1-1":2, 
  "1-1-0":2, 
  "1-1-1":3, 
  "0-0-0":0,
  "1-0-0.5":1.5,
  "1-0-0 (SOS)":0.5,
  "1-0-1 (Alt Day)":1,
}

const medicineCategories = [
  { label: "Antibiotic", value: "ANTIBIOTIC" },
  { label: "Analgesic", value: "ANALGESIC" },
  { label: "Antihistamine", value: "ANTIHISTAMINE" },
  { label: "Antiseptic", value: "ANTISEPTIC" },
  { label: "Vitamin", value: "VITAMIN" },
  { label: "Mineral", value: "MINERAL" },
  { label: "Herbal", value: "HERBAL" },
  { label: "Homeopathic", value: "HOMEOPATHIC" },
  { label: "Other", value: "OTHER" }
];

const medicineTypes = [
  { label: "Syrup", value: "SYRUP" },
  { label: "Tablet", value: "TABLET" },
  { label: "Capsule", value: "CAPSULE" },
  { label: "Injection", value: "INJECTION" },
  { label: "Ointment", value: "OINTMENT" },
  { label: "Liquid", value: "LIQUID" },
  { label: "Powder", value: "POWDER" },
  { label: "Cream", value: "CREAM" },
  { label: "Spray", value: "SPRAY" },
  { label: "Drops", value: "DROPS" }
];



export {bloodGroups,doctorSpecializations,doctorDepartments,
  appointmentReasons, symptoms, tests, dosageFrequencies, medicineCategories,
   medicineTypes,freqMap};
