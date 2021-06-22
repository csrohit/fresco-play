var mongoose=require('mongoose');

var schema=mongoose.Schema;

const appointmentsSchema=new schema({
	_id: mongoose.Schema.Types.ObjectId,
	fname: String,
	lname: String,
    disease:String,
    priority:String,
    AppointmentDate:Date,
    patientId:String,
    bookingTime: Date
})

module.exports=mongoose.model('appointments',appointmentsSchema);