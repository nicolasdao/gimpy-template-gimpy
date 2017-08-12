const shell = require('shelljs')
/*eslint-disable */
const colors = require('colors')
/*eslint-enable */

/**
 * This function will be triggered when the following command is run:
 *
 * 	gimp deploy [env] [option1] [option2] [option3] [option4] [option5]
 *
 * Notice that all those gimp params are optional, and that there is
 * maximum 5 options (if you need more, use process.args). This should
 * provide enough flexibility to implement most deployment strategies.
 */
exports.deploy = (env, option1, option2, option3, option4, option5) => {
	// Add your deployment code here
	shell.exec('Hello. I\'m your gimp. Train me to deploy, and I\'ll do that chore for you whenever you order me Master.'.italic.cyan)
}