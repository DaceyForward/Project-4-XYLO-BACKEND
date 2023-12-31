const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			// required: true,
		},
		lastName: {
			type: String,
			// required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		token: String,
	},
	{
		timestamps: true,
		toObject: {
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
		},
	}
)

module.exports = mongoose.model('User', userSchema)
