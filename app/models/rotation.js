const mongoose = require('mongoose')

const rotationSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		theme: {
			type: String,
			required: true,
		},
		toys: {
			// type: mongoose.Schema.Types.ObjectId,
			// ref: 'Toy',
			type: String,
			// enum: "",
			// required: true,
			//default: 
		},
		start: {
			type: Date,
			required: false,
		},
		end: {
			type: Date,
			required: false,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			// required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Rotation', rotationSchema)
