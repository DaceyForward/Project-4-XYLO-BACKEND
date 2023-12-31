const mongoose = require('mongoose')

const toySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		level: {
			type: String,
			required: true,
		},
		focusArea: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
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

module.exports = mongoose.model('Toy', toySchema)
