// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for rotations
const Rotation = require('../models/rotation')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { rotation: { title: '', text: 'foo' } } -> { rotation: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /rotations
router.get('/rotations', (req, res, next) => {
	Rotation.find()
		.then((rotations) => {
			// `rotations` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return rotations.map((rotation) => rotation.toObject())
		})
		// respond with status 200 and JSON of the rotations
		.then((rotations) => res.status(200).json({ rotations: rotations }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// INDEX - USER SPECIFIC
// GET /rotations/mine
router.get('/rotations/mine', requireToken, (req, res, next) => {
	Rotation.find({ owner: req.user.id })
		.then((rotations) => {
			// `rotations` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return rotations.map((rotation) => rotation.toObject())
		})
		// respond with status 200 and JSON of the rotations
		.then((rotations) => res.status(200).json({ rotations: rotations }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /rotations/
router.get('/rotations/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Rotation.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "rotation" JSON
		.then((rotation) => res.status(200).json({ rotation: rotation.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /rotations
router.post('/rotations', requireToken, (req, res, next) => {
	// set owner of new rotation to be current user
	req.body.rotation.owner = req.user.id

	Rotation.create(req.body.rotation)
		// respond to succesful `create` with status 201 and JSON of new "rotation"
		.then((rotation) => {
			res.status(201).json({ rotation: rotation.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /rotations/
router.patch('/rotations/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.rotation.owner

	Rotation.findById(req.params.id)
		.then(handle404)
		.then((rotation) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, rotation)

			// pass the result of Mongoose's `.update` to the next `.then`
			return rotation.updateOne(req.body.rotation)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /rotations/
router.delete('/rotations/:id', requireToken, (req, res, next) => {
	Rotation.findById(req.params.id)
		.then(handle404)
		.then((rotation) => {
			// throw an error if current user doesn't own `rotation`
			requireOwnership(req, rotation)
			// delete the rotation ONLY IF the above didn't throw
			rotation.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
