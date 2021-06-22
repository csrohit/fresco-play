module.exports ={
  validToken:require('../API/validToken.js'),
  login:require('../API/login.js'),
  register:require('../API/register.js'),
  fetchUsers:require('../API/getUsers.js'),
  addPatient:require('../API/addPatient.js'),
  fetchPatient:require('../API/fetchPatient.js'),
  fetchSinglePatient:require('../API/fetchSinglePatient.js'),
  editProfile:require('../API/editProfile.js'),
  diseases:require('../API/diseases.js'),
  bookAppointments:require('../API/bookAppointment.js'),
  fetchAppointment:require('../API/fetchAppointments.js'),
  deleteAppointment:require('../API/deleteAppointment.js'),
  singlePatientAppointments:require('../API/singlePatientAppointments.js'),
  getProfile:require('../API/getProfile.js')
}