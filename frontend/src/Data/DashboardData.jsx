const data = [
  { date: 'Jan 2025', appointments: 54 },
  { date: 'Feb 2025', appointments: 62 },
  { date: 'Mar 2025', appointments: 71 },
  { date: 'Apr 2025', appointments: 48 },
  { date: 'May 2025', appointments: 85 },
  { date: 'Jun 2025', appointments: 67 },
  { date: 'Jul 2025', appointments: 73 },
  { date: 'Aug 2025', appointments: 59 },
  { date: 'Sep 2025', appointments: 64 },
  { date: 'Oct 2025', appointments: 78 },
  { date: 'Nov 2025', appointments: 69 },
  { date: 'Dec 2025', appointments: 91 },
];

const doctorData = [
  { date: 'Feb 2025', doctors: 14 },
  { date: 'Jan 2025', doctors: 12 },
  { date: 'Mar 2025', doctors: 15 },
  { date: 'Apr 2025', doctors: 13 },
  { date: 'May 2025', doctors: 16 },
  { date: 'Jun 2025', doctors: 18 },
  { date: 'Jul 2025', doctors: 19 },
  { date: 'Aug 2025', doctors: 17 },
  { date: 'Sep 2025', doctors: 18 },
  { date: 'Oct 2025', doctors: 20 },
  { date: 'Nov 2025', doctors: 22 },
  { date: 'Dec 2025', doctors: 24 },
];

const patientData = [
  { date: 'Jan 2025', patients: 430 },
  { date: 'Feb 2025', patients: 480 },
  { date: 'Mar 2025', patients: 512 },
  { date: 'Apr 2025', patients: 465 },
  { date: 'May 2025', patients: 590 },
  { date: 'Jun 2025', patients: 560 },
  { date: 'Jul 2025', patients: 605 },
  { date: 'Aug 2025', patients: 578 },
  { date: 'Sep 2025', patients: 620 },
  { date: 'Oct 2025', patients: 640 },
  { date: 'Nov 2025', patients: 615 },
  { date: 'Dec 2025', patients: 680 }
];

const diseaseData = [
  { name: 'Flu', value: 120, color: 'indigo.6' },
  { name: 'Diabetes', value: 95, color: 'orange.6' },
  { name: 'Hypertension', value: 110, color: 'red.6' },
  { name: 'Asthma', value: 75, color: 'teal.6' },
  { name: 'Covid-19', value: 130, color: 'green.6' },
  { name: 'Allergy', value: 88, color: 'yellow.6' },
  { name: 'Arthritis', value: 67, color: 'grape.6' },
  { name: 'Migraine', value: 54, color: 'pink.6' },
  { name: 'Heart Disease', value: 102, color: 'brown.6' },
  { name: 'Skin Infection', value: 60, color: 'gray.6' }
];


const patients = [
  { name: 'Aminul Islam', email: 'aminul.islam@example.com', location: 'Dhaka', bloodGroup: 'A+' },
  { name: 'Sadia Rahman', email: 'sadia.rahman@example.com', location: 'Chittagong', bloodGroup: 'B+' },
  { name: 'Rakib Hasan', email: 'rakib.hasan@example.com', location: 'Khulna', bloodGroup: 'O+' },
  { name: 'Tania Akter', email: 'tania.akter@example.com', location: 'Rajshahi', bloodGroup: 'AB-' },
  { name: 'Mahmudul Haque', email: 'mahmudul.haque@example.com', location: 'Sylhet', bloodGroup: 'A-' },
  { name: 'Nusrat Jahan', email: 'nusrat.jahan@example.com', location: 'Barisal', bloodGroup: 'B-' },
  { name: 'Hasan Ali', email: 'hasan.ali@example.com', location: 'Rangpur', bloodGroup: 'O-' },
  { name: 'Fahim Ahmed', email: 'fahim.ahmed@example.com', location: 'Mymensingh', bloodGroup: 'AB+' },
  { name: 'Mim Chowdhury', email: 'mim.chowdhury@example.com', location: 'Cumilla', bloodGroup: 'A+' },
  { name: 'Shakil Khan', email: 'shakil.khan@example.com', location: 'Gazipur', bloodGroup: 'B+' }
];

const medicines = [
  { name: 'Paracetamol', dosage: '500mg', stock: 250, manufacturer: 'Square Pharmaceuticals' },
  { name: 'Amoxicillin', dosage: '250mg', stock: 180, manufacturer: 'Beximco Pharmaceuticals' },
  { name: 'Cefixime', dosage: '200mg', stock: 140, manufacturer: 'Incepta Pharmaceuticals' },
  { name: 'Omeprazole', dosage: '20mg', stock: 210, manufacturer: 'ACI Limited' },
  { name: 'Azithromycin', dosage: '500mg', stock: 165, manufacturer: 'Renata Limited' },
  { name: 'Metformin', dosage: '850mg', stock: 190, manufacturer: 'Eskayef Pharmaceuticals' },
  { name: 'Losartan', dosage: '50mg', stock: 130, manufacturer: 'Aristopharma Limited' },
  { name: 'Cetirizine', dosage: '10mg', stock: 220, manufacturer: 'Opsonin Pharma' },
  { name: 'Ibuprofen', dosage: '400mg', stock: 175, manufacturer: 'Healthcare Pharmaceuticals' },
  { name: 'Vitamin C', dosage: '500mg', stock: 300, manufacturer: 'Drug International' }
];

const doctors = [
  { name: 'Dr. Mahmud Hossain', email: 'mahmud.hossain@example.com', location: 'Dhaka', department: 'Cardiology' },
  { name: 'Dr. Farzana Akter', email: 'farzana.akter@example.com', location: 'Chittagong', department: 'Neurology' },
  { name: 'Dr. Imran Karim', email: 'imran.karim@example.com', location: 'Khulna', department: 'Orthopedics' },
  { name: 'Dr. Nusrat Sultana', email: 'nusrat.sultana@example.com', location: 'Rajshahi', department: 'Dermatology' },
  { name: 'Dr. Ahsan Rahman', email: 'ahsan.rahman@example.com', location: 'Sylhet', department: 'Pediatrics' },
  { name: 'Dr. Sadia Noor', email: 'sadia.noor@example.com', location: 'Barisal', department: 'Gynecology' },
  { name: 'Dr. Tariq Islam', email: 'tariq.islam@example.com', location: 'Rangpur', department: 'General Surgery' },
  { name: 'Dr. Nazmul Hasan', email: 'nazmul.hasan@example.com', location: 'Mymensingh', department: 'Urology' },
  { name: 'Dr. Rafiq Chowdhury', email: 'rafiq.chowdhury@example.com', location: 'Cumilla', department: 'ENT' },
  { name: 'Dr. Sumaiya Ahmed', email: 'sumaiya.ahmed@example.com', location: 'Gazipur', department: 'Ophthalmology' }
];

const appointments = [
  { time: '2025-01-05 10:00 AM', patient: 'Aminul Islam', reason: 'Chest Pain', doctor: 'Dr. Mahmud Hossain' },
  { time: '2025-01-06 11:30 AM', patient: 'Sadia Rahman', reason: 'Migraine', doctor: 'Dr. Farzana Akter' },
  { time: '2025-01-07 09:45 AM', patient: 'Rakib Hasan', reason: 'Back Pain', doctor: 'Dr. Imran Karim' },
  { time: '2025-01-07 02:15 PM', patient: 'Tania Akter', reason: 'Skin Rash', doctor: 'Dr. Nusrat Sultana' },
  { time: '2025-01-08 03:00 PM', patient: 'Mahmudul Haque', reason: 'Fever & Cough', doctor: 'Dr. Ahsan Rahman' },
  { time: '2025-01-09 10:30 AM', patient: 'Nusrat Jahan', reason: 'Pregnancy Checkup', doctor: 'Dr. Sadia Noor' },
  { time: '2025-01-10 12:00 PM', patient: 'Hasan Ali', reason: 'Appendicitis Consultation', doctor: 'Dr. Tariq Islam' },
  { time: '2025-01-11 09:30 AM', patient: 'Fahim Ahmed', reason: 'Kidney Stone', doctor: 'Dr. Nazmul Hasan' },
  { time: '2025-01-12 01:15 PM', patient: 'Mim Chowdhury', reason: 'Hearing Problem', doctor: 'Dr. Rafiq Chowdhury' },
  { time: '2025-01-13 11:00 AM', patient: 'Shakil Khan', reason: 'Vision Blurriness', doctor: 'Dr. Sumaiya Ahmed' }
];


export {data,doctorData,patientData,diseaseData,patients,medicines,doctors,appointments};
