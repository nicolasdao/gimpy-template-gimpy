const { assert } = require('chai')
const fs = require('fs')
const path = require('path')

describe('gimpy-template', () => 
	describe('#questions', () => 
		it('Should have a questions.js module with at least 2 properties called \'questions\' and \'preQuestions\'.', () => {
			const q = require('../questions')
			assert.isOk(q, 'Missing required \'questions.js\' module.')
			assert.isOk(q.questions, 'Missing required \'questions\' object in the \'questions.js\' module.')
			assert.isOk(q.questions.length >= 0, 'The \'questions\' object in the \'questions.js\' module must be an array.')
			assert.isOk(q.preQuestions, 'Missing required \'preQuestions\' object in the \'questions.js\' module.')
			assert.equal(typeof(q.preQuestions), 'function' , 'The \'preQuestions\' object in the \'questions.js\' module must be a function.')
		})))

describe('gimpy-template', () => 
	describe('#templates', () => 
		it('Should have a directory called \'templates\'.', () => {
			assert.equal(fs.existsSync(path.join(__dirname, '../templates')), true, 'Missing required \'templates\' folder.')
		})))