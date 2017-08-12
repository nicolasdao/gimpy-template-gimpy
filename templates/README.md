<a href="https://neap.co" target="_blank"><img src="https://neap.co/img/neap_black_small_logo.png" alt="Neap Pty Ltd logo" title="Neap" align="right" height="50" width="120"/></a>

## Foundation To Any Gimpy Template
This [gimpy](https://github.com/nicolasdao/gimpy) template is the basic foundation that can be used to start building a new gimpy template. It is being used by [gimpy](https://github.com/nicolasdao/gimpy) when you run:
```
gimp init your-own-template
```
Which is the equivalent to:
```
gimp new gimpy your-own-template
```

## How To Build Your Own Gimpy Template
Simple! Just use this template, i.e.
```
gimp init your-own-template
```
Gimpy will use this template, and you'll just have to customize the _**questions.js**_ and add whatever files and folders you want under the _**templates**_ folder. 

## Gimpy Template Structure
The structure of a gimpy template is dead simple. There are only 2 main parts:
1. _**questions.js**_ file - This is the file that describes the questionnaire that collects the configuration settings for your project.
2. _**templates**_ folder - This is the folder that contains whatever files and folders you want. Simply copy/paste whatever you want there.

Gimpy's process is really straightforward. It will copy all the files and folders located in the _templates_ folder, and paste them to the desired location. Then, it will use the answers collected in the _questions.js_ to replace any token in the recently pasted files. 

You'll also notice some extra files (_package.json_, _test_ folder). This is just to allow you to test your template before you host it to github. Once you're ready with your own template and questions.js, simply run the following to test that everything is ok:

```
npm install
npm test
```

## Let's Write Some Questions - questions.js
A question is simply an object in the array defined under ```exports.questions``` in the _**questions.js**_ file. Answering a question will make you move to the next one. The answer of each question is stored inside an _**answers**_ object. This _**answers**_ object is passed from one question to the other, so that each question can access the previous answers (this is usually useful to provide default answer or more advanced behaviors). Let's have a look:
```js
// NOTICE: 'colors' package is used by gimpy. You don't have to worry about it.
const colors = require('colors')

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
```

The code above is self-explanatory. Let's have a more detailed look at the _**questions**_ array:

A question object is made of 6 properties (2 required and 4 optional):

| Property  | Required | Description
| ------------- | ------------- | ------------- |
| question  | required | Function that takes 1 argument (the _**answers**_ object) and returns a string (i.e. the question). |
| answerName  | required | Name of the property inside the _**answers**_ object that will contain the answer of the question. This is also the name of the token that you'll put between {{ }} in your files under the _templates_ folder. |
| defaultValue  | optional | Default value if no answer is provided to the question. |
| execute  | optional | Object containing 3 functions: <ul><li>validate - Validate the answer.</li><li>onSuccess - This is an opportunity to format the answer.</li><li>onError - Display the error message if the validation fails.</li></ul> |
| files  | optional | Array of files located under your _templates_ folder. |
| skip  | optional | Function that defines when the current question should be skipped. If it is skipped, the property _answerName_ will still be added to the _answers_ object. The value will either be the _defaultValue_ or '' if the defaultValue has not been defined. |

In the _**questions.js**_ above, you can see 4 questions. Those 4 questions have the following attributes:
1. _projectName_ is the property name that will be added in the _**answers**_ object. The _package.json_ will be affected by that answer. That means that if there is a token called _**{{projectName}}**_ in the package.json, then it will be replaced by whatever value has been answered to this question.
2. _projectVersion_ is the property name that will be added in the _**answers**_ object. The _package.json_ will be affected by that answer. That means that if there is a token called _**{{projectVersion}}**_ in the package.json, then it will be replaced by whatever value has been answered to this question.
3. _gimpHome_ is the property name that will be added in the _**answers**_ object. The _index.html_ will be affected by that answer. That means that if there is a token called _**{{gimpHome}}**_ in the index.html, then it will be replaced by whatever value has been answered to this question.
4. _timeInTheBox_ is the property name that will be added in the _**answers**_ object. This question will be skipped if the answer to the 3rd question is different than 'The Box'. The _index.html_ will be affected by that answer. That means that if there is a token called _**{{timeInTheBox}}**_ in the index.html, then it will be replaced by whatever value has been answered to this question.

## Publishing Your Gimpy Template
Simply host it publicly on GitHub, and make sure your repo starts with _**gimpy-template-[your-template-name]**_. As soon as it is hosted on GitHub, you'll see it appearing in the list when you run:
```
gimp ls
```
## Optional Deployment
In certain case, you may want to automate your project's deployment. This is a typical chore for your users and that's why deployment is a classical task for gimpy. Gimpy will deploy your project with the following command:
```
gimp deploy
```
Typically this command would deploy your project locally (that being said, you could code this differently). The recommended way to deploy to an environment different from your local machine is:
```
gimp deploy prod
``` 
If your project requires more sophisticated deployment, you could pass up to 5 other options to gimp deploy:
```
gimp deploy prod blabla1 blibli2 pafpaf3 boomboom4 slapslap5
```
where blabla1, blibli2, ... could be renamed whatever you wish.

So what's happening when ```gimp deploy``` is being executed? 

The expectation is that your gimpy template would contain a _**deploy.js**_ file. There is one in this example:
```js
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
	shell.exec(`Hello. I'm your gimp. Train me to deploy, and I'll do that chore for you whenever you order me Master.`.italic.cyan)
}
```

As you can see, the only requirement is to define an ```exports.deploy``` function that accept the arguments that you would have passed in the ```gimp deploy``` command. If you want to see more sophisticated example, checkout the [_deploy.js of the webapp-serverless gimpy template_](https://github.com/nicolasdao/gimpy-template-webapp-serverless/blob/master/templates/deploy.js). It deploys its project to either Google Cloud Funcions or Firebase Functions based on its _**appconfig.json**_ file.

## This Is What We re Up To
We are Neap, an Australian Technology consultancy powering the startup ecosystem in Sydney. We simply love building Tech and also meeting new people, so don't hesitate to connect with us at [https://neap.co](https://neap.co).

## License
Copyright (c) 2017, Neap Pty Ltd.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Neap Pty Ltd nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL NEAP PTY LTD BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
