const shell = require('shelljs')
const colors = require('colors')

const GIMPHOME = ['The Box', 'The Dungeon', 'The Basement']

exports.preQuestions = () => {
	// Fill this if you want to perform any type of prerequisite checks. For example, you may want to make sure that 
	// git is installed:
	// 
	// const gitNotInstalled = !shell.exec('which git', {silent:true}).stdout
	// if (gitNotInstalled) {
	// 	console.log(`git must be installed to make this work!`.red)
	// 	process.exit(1)
	// }
	// 
	// NOTICE: the 'shelljs' and 'colors' package are used by gimpy. You don't have to worry about those.
}

exports.questions = [{
	question: answers => `project name: ${answers._dest ? `(${answers._dest.split(' ').join('-')}) ` : ''} `.cyan,
	answerName: 'projectName',
	defaultValue: answers => answers._dest.split(' ').join('-'),
	files: ['package.json']
},{
	question: () => 'project version: (1.0.0) '.cyan,
	answerName: 'projectVersion',
	defaultValue: answers => '1.0.0',
	files: ['package.json']
},{
	question: () => ('Where do you want to send your gimp? \n' + 
					'  [1] The Box \n' +
					'  [2] The Dungeon \n' +
					'  [3] The Basement \n' +
					'Choose one of the above: ([1]) ').cyan,
	answerName: 'gimpHome',
	defaultValue: answers => 1,
	execute: {
		validate: answer => GIMPHOME[(answer-1)*1],
		onSuccess: answer => GIMPHOME[(answer-1)*1],
		onError: answer => `'${answer}' is not a valid home for your gimp.`
	},
	files: ['index.html']
}]
