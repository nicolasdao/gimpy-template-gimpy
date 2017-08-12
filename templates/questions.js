// NOTICE: 'colors' package is used by gimpy. You don't have to worry about it.
/*eslint-disable */
const colors = require('colors')
/*eslint-enable */

const GIMPHOME = { '1': 'The Box', '2': 'The Dungeon', '3': 'The Basement' }

/**
 * Fill this if you want to perform any type of prerequisite checks. For example, you may want to make sure that
 * git is installed
 */
exports.preQuestions = () => {
	// const gitNotInstalled = !shell.exec('which git', {silent:true}).stdout
	// if (gitNotInstalled) {
	// 	console.log(`git must be installed to make this work!`.red)
	// 	process.exit(1)
	// }
}

/**
 * Optional custom message to be displayed in your terminal after your gimpy template has been successfully installed.
 * If you do not define anything, the default message will be the following:
 *
 * `New ${answers._projectType} project successfully created.`
 *
 * Where 'answers._projectType' is the official name of your template.
 */
exports.onTemplateLoaded = answers => `Congratulation Master! Your new project has been created!`

/**
 * These are the questions that will be asked in the terminal as soon as you run the following command:
 *
 * 	gimp new your-gimpy-template-name your-app
 *
 */
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
		validate: answer => GIMPHOME[`${answer}`],
		onSuccess: answer => GIMPHOME[`${answer}`],
		onError: answer => `'${answer}' is not a valid home for your gimp.`
	},
	files: ['index.html']
},{
	skip: answers => answers.gimpHome != 'The Box',
	question: () => 'How long should the gimp stay in its box? '.cyan,
	answerName: 'timeInTheBox',
	defaultValue: answers => '1 day',
	files: ['index.html']
}]
