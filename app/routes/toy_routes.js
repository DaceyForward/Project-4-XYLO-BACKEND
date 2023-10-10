// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for toys
const Toy = require('../models/toy')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { toy: { title: '', text: 'foo' } } -> { toy: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /toys
router.get('/toys', requireToken, (req, res, next) => {
	Toy.find()
		.then((toys) => {
			// `toys` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return toys.map((toy) => toy.toObject())
		})
		// respond with status 200 and JSON of the toys
		.then((toys) => res.status(200).json({ toys: toys }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /toys/
router.get('/toys/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Toy.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "toy" JSON
		.then((toy) => res.status(200).json({ toy: toy.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /toys
router.post('/toys', requireToken, (req, res, next) => {
	// set owner of new toy to be current user
	req.body.toy.owner = req.user.id

	Toy.create(req.body.toy)
		// respond to succesful `create` with status 201 and JSON of new "toy"
		.then((toy) => {
			res.status(201).json({ toy: toy.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /toys/
router.patch('/toys/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.toy.owner

	Toy.findById(req.params.id)
		.then(handle404)
		.then((toy) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, toy)

			// pass the result of Mongoose's `.update` to the next `.then`
			return toy.updateOne(req.body.toy)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /toys/
router.delete('/toys/:id', requireToken, (req, res, next) => {
	Toy.findById(req.params.id)
		.then(handle404)
		.then((toy) => {
			// throw an error if current user doesn't own `toy`
			requireOwnership(req, toy)
			// delete the toy ONLY IF the above didn't throw
			toy.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
