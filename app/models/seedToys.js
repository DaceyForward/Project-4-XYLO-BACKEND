// seedToys.js will run with the command `npm run seed`

const mongoose = require('mongoose')
const Toy = require('./toy')
const db = require('../../config/db')

const startToys = [
    { name: 'shaker eggs', level: '3-6 months', focusArea: 'music', type: 'wooden'},
    { name: 'high contrast rattle', level: '0-3 months', focusArea: 'grasping and tracking', type: 'silicone'},
    { name: 'Wooden Coin Bank', level: '13-15 months', focusArea: 'fine motor', type: 'wooden'},
    { name: 'Race & Chase Ramp', level: '16-18 months', focusArea: 'motion and direction', type: 'wooden'},
    { name: 'Lockbox', level: '19-21 months', focusArea: 'mechanical thinking and problem-solving', type: 'wooden'},
    { name: 'Geo Shapes Puzzle', level: '19-21 months', focusArea: 'complex shapes', type: 'wooden'},
    { name: 'Weigh Scale & Pails', level: '28-30 months', focusArea: 'balance and measurement', type: 'wooden'},
    { name: 'Animal Match', level: '22-24 months', focusArea: 'similar and different', type: 'plastic and wooden'},
    { name: 'Color Theory Puzzle', level: '46-48 months', focusArea: 'complex problem-solving', type: 'wooden'},
    { name: 'Weather Board', level: '37-39 months', focusArea: 'science and weather', type: 'wooden'}
]

// first connect to the db
// then remove all toys without owners
// then insert the startToys
// then ALWAYS close the connection from this file

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        Toy.deleteMany({ owner: null })
            .then(deletedToys => {
                console.log('the deleted toys: \n', deletedToys)

                Toy.create(startToys)
                    .then(newToys => {
                        console.log('new toys added to db: \n', newToys)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log('an error occurred: \n', error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log('an error occurred: \n', error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log('an error occurred: \n', error)
        mongoose.connection.close()
    })