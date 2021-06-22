var mongoose=require('mongoose');

var schema=mongoose.Schema;

var ToySchema = new schema({ diseaseName: String });

const diseasesSchema=new schema({
	_id: mongoose.Schema.Types.ObjectId,
	diseases:[String]
})

module.exports=mongoose.model('diseases',diseasesSchema);