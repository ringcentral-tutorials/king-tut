# King-Tut

A tutorial about how you can build code-based tutorials from your programming experience using the [RingCentral Connect Platform](https://developers.ringcentral.com) and contributing this knowledge to the [RingCentral Tutorials library](https://developers.ringcentral.com/tutorials).

## Table of Contents

* Key Benefits
* Prerequisites
* Installation
* Getting Started
* Critical Concepts
* Tutorial Repository Naming Convention
* Code Prose
* Contributing

## Key Benefits

* Makes developer's lives better through code
* Distributes knowledge
* Easy to use and create
* Programming language idiomatic tutorials

## Prerequisites

These are the things you will need before you get started:

1. [Node.js](https://nodejs.org) installed on your local workstation
2. [NPM](https://www.npmjs.com/) installed (comes with Node.js) on your local workstation
3. [Git]() installed on your local workstation
4. Your sample app, or demo code written in your programming language
5. Command Line access (and be part of `sudoers` group, or on Windows have admin rights) on your local workstation
6. Browser for viewing your tutorial on your local workstation

## Installation

Install RingCentral themed viewsaurus to the GLOBAL NPM space of your local workstation

```
npm install -g viewsaurus-ringcentral
```

## Getting Started

#### This is the lastest process which doesn't require a separate git branch. For the old process please read the [1.0 version](https://github.com/ringcentral-tutorials/king-tut/tree/1.0) of this repo

### New Tutorials

1. Make sure you have initialized your application as a Git repository if you haven't already (make sure to follow the [Tutorial Repository Naming Conventions](#tutorial-repository-naming-convention)). `git init` and complete the questions to build your repository
1. Once your demo app or sample code is stable, create a new directory named "docs" in the root directory: `mkdir docs`
1. `cd docs` and `saurus new` to initialize tutorial
1. Stage and commit the changes as follows, `git add -A` to stage the changes and `git commit -m "Initialize tutorial"` to commit this to history
1. Update the tutorial configuration in **/docs/tutorials/config.json** appropriately (see some of the other tutorials for reference)
1. Stage and commit the changes as follows, `git add -A` to stage the changes and `git commit -m "Configure tutorial"` to commit this to history
1. Author the tutorial prose in **/docs/tutorials/index.jade** using/replacing the existing samples as needed. Make sure to read the [Critical Concepts](#critical-concepts) to learn more about writing tutorial prose in this format
1. Once you feel satisfied it is complete, test viewing it locally (follow the directions in the console to get the URL for opening the tutorial locally), `cd docs && saurus author` (if you see any errors, it is usually in formatting of the Jade file)
1. Check the tutorial in browser by navigating to http://localhost:8888/ to make sure it works as expected
1. If the final tutorial operates as expected, you are ready to stage and commit the tutorial,  `git add -A` to stage the changes and `git commit -m "Complete the tutorial prose"` to commit this to history
1. Push the commits to the remote repository on Github, `git push origin master`
1. Update the repository setting in GitHub, Change GitHub Pages Source to be **master branch /docs folder**.
1. Create PR for [RingCentral Developer Tutorial Index](https://github.com/ringcentral/tutorials) asking for your newly created tutorial to be forked into the listings. Take [this PR](https://github.com/ringcentral/tutorials/pull/16) for example.


### Updating Tutorials

There are a variety of reasons to update a tutorial (updates, improvements, etc...), but how do you go about doing that?

1. Run viewsaurus compile process: `cd docs && saurus author`
    1. `saurus author` is a watcher process and it won't quit automatically
    1. Whenever you make some changes, `saurus author` process will update the static website in `docs/` folder.
1. Make your changes to the demo app or sample code.
1. Update the tutorial's prose (and config if necessary) in the **/docs/tutorials/index.jade** file
1. Check the tutorial in browser by navigating to http://localhost:8888/ to make sure it works as expected
1. Repeat step 2 - 4 until you think it's time to publish your change.
1. Stage and commit the changes `git add -A` and `git commit -m "{{COMMIT MESSAGE}}"` respectively
1. Push your tutorial changes `git push origin master`


## Critical Concepts

### Demo App or Sample Code

### Tutorial Prose

Tutorial prose (the grammer that speaks to the code) can be written in either [Jade](https://naltatis.github.io/jade-syntax-docs/) or [Markdown](https://daringfireball.net/projects/markdown/syntax). After running `saurus new`, please see the file **/docs/tutorials/index.jade** for an example of using either or both in a single tutorial.

#### Chapters

Chapters are the "major sections" within a tutorial's prose. These display as "large bold sections" in the tutorial outline that developers can view. Use Chapters to organize the "big thoughts".

#### Steps

Steps are the pieces which compose a Chapter. These display as sub-sections to Chapters in the tutorial outline and provide granular instruction about what a particular piece of code is doing. Steps can reference code files within your respository (and even highlight a section of that particular file using `data-highlight="{{START FILE LINE}}-{{END FILE LINE}}"` in the step's attributes).

## Tutorial Repository Naming Convention

All words in the title must be separated by a hyphen and lowercase, followed by a hyphen, followed by the programming language the demo code for this tutorial was written, followed by a hyphen and lastly the word “demo”. Here is a templatized example, colors in this document are only used as a visual indicator of the POSITION of that word type in the tutorial repository name.

**Schema:** __use-case-specific-title[-lang][-framework]-demo__

**Titles must be use-case specific**

**LANG** is required and must equal one of the following

* C-Sharp = csharp
* Java = java
* NodeJS  = nodejs
* JavaScript  = js
* PHP     = php
* Python      = python
* Ruby        = ruby

**FRAMEWORK** is required and maps to the following (as examples, too many to create full list)

* Ruby Sinatra        = sinatra
* Ruby Rails      = rails
* NodeJS Angular  = angularjs
* NodeJS Express  = express
* NodeJS React        = react

Examples using the new naming convention

* handling-real-time-events-with-pubnub-subscriptions-nodejs-demo
* backup-business-communication-activity-data-php-demo
* getting-started-with-webrtc-express-demo

## Code Prose

When writing your prose it is important that you provide some context or "how to setup" things for developers so they understand what is being discussed.

Each Step of your tutorial should contain useful information that describes what is happening in a piece of code, or provide some useful context with links for developers to find more information in the reference.

Make the copy of each step as succinct as possible.

## Contributing

To contribute your tutorial into the main repository, create PR for [RingCentral Developer Tutorial Index](https://github.com/ringcentral/tutorials). Take [this PR](https://github.com/ringcentral/tutorials/pull/16) for example.
