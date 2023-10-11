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
			// required: true,
		},
		end: {
			type: Date,
			// required: true,
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
