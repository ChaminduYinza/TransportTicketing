var mongoose = require('mongoose');

var busRouteSchema = mongoose.Schema({

routeName:{
	type: String,
	required: true
},
amount:{
	type: String,
	required: true
},

reorderlevel:{
	type: String,
	
},

create_date:{
	type: Date,
	default: Date.now
}

});
