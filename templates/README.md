<a href="https://neap.co" target="_blank"><img src="https://neap.co/img/neap_black_small_logo.png" alt="Neap Pty Ltd logo" title="Neap" align="right" height="50" width="120"/></a>

## This Is a Basic Gimpy Template
This gimpy template is the basic foundation that anybody can use to start building their own template. The structure of a gimpy template is dead simple. There are only 2 main parts:
1. _**questions.js**_ file - This is the file that describes the questionnaire that collects the configuration settings for your project.
2. _**templates**_ folder - This is the folder that contains whatever files and folders you want. Simply copy/paste whatever you want there.

Gimpy's process is really straightforward. It will copy all the files and folders located in the _templates_ folder, and paste them to the desired location. Then, it will use the answers collected in the _questions.js_ to replace any token in the recently pasted files. 

You'll also notice some extra files (_package.json_, _test_ folder). This is just to allow you to test your template before you host it to github. Once you're ready with your own template and questions.js, simply run the following to test that everything is ok:

```
npm install
npm test
```

## Let's Write Some Questions - questions.js
A question is simply an object in the array defined under ```exports.questions``` in the _**questions.js**_ file. Answering a question will make you move to the next one. The answer of each question is stored inside an _**answers**_ object. This _**answers**_ object is passed from one question to the other, so that each question can access the previous answers (this is usually useful to provide default answer).

A question object is made of 5 properties:

| Property  | Required | Description
| ------------- | ------------- | ------------- |
| question  | required | Function that takes 1 argument (the _**answers**_ object) and returns a string (i.e. the question). |
| answerName  | required | Name of the property inside the _**answers**_ object that will contain the answer of the question. This is also the name of the token that you'll put between {{ }} in your files under the _templates_ folder. |
| defaultValue  | optional | Default value if no answer is provided to the question. |
| execute  | optional | Object containing 3 functions: <ul><li>validate - Validate the answer.</li><li>onSuccess - This is an opportunity to format the answer.</li><li>onError - Display the error message if the validation fails.</li></ul> |
| files  | optional | Array of files located under your _templates_ folder. |

In this _**questions.js**_, you can see 3 questions. Those 3 questions have the following attributes:
1. _projectName_ is the property that will store the answer in the _**answers**_ object. The _package.json_ will be affected by that answer. That means that if there is a token called _**{{projectName}}**_ in the package.json, then it will be replaced by whatever value has been answered to this question.
2. _projectVersion_ is the property that will store the answer in the _**answers**_ object. The _package.json_ will be affected by that answer. That means that if there is a token called _**{{projectVersion}}**_ in the package.json, then it will be replaced by whatever value has been answered to this question.
3. _gimpHome_ is the property that will store the answer in the _**answers**_ object. The _index.html_ will be affected by that answer. That means that if there is a token called _**{{gimpHome}}**_ in the index.html, then it will be replaced by whatever value has been answered to this question.

## Publishing Your Gimpy Template
Simply host it publicly on GitHub, and make sure your repo starts with _**gimpy-template-[your-template-name]**_. As soon as it is hosted on GitHub, you'll see it appearing in the list when you run:
```
gimp ls
```

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
