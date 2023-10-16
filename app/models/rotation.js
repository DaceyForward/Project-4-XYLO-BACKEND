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
			type: String,
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
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Rotation', rotationSchema)
