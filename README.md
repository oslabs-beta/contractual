# [**_CONTRACTUAL_**](https://www.contractualapp.io/)

<div align="center">

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/oslabs-beta/SeeQR)
![Release: 7.0.1](https://img.shields.io/badge/Release-1.0.0-red)
![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)
![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-blue.svg)
[![Github stars](https://img.shields.io/github/stars/oslabs-beta/contractual?style=social)](https://github.com/open-source-labs/SeeQR)

</div>

## Table of Contents

<!-- - [Table of Contents](#table-of-contents) -->

- [0. Brief](#0-brief)
- [1. Features](#1-features)
- [2. Installation](#2-installation)
  - [- 2.1 Download Installer](#--download-installer)
  - [- 2.2 Fork and Clone Repo](#--fork-and-clone-repo)
- [3. How to Use](#3-how-to-use)
  - [3.1 Contract Builder](#31-contract-builder)
  - [3.2 Front Tester](#32-front-tester)
  - [3.3 Back Tester](#33-back-tester)
  - [3.4 Document Creator](#34-document-creator)
- [4. Iteration Opportunities](#4-iteration-opportunities)
- [5. Contributors](#5-contributors)

## 0. BRIEF

Contractual is a tool designed to complement team-based development for web applications that utilize JS and Node.js.

Contractual's design philosophy is centered around what we call "Contract driven development".

Contract refers to the data contract between client and server. Contractual allows development teams to define their applications data contract using a simple user interface.

Additionally, frontend/backend development teams will be able to test their applications confidently in a decoupled manner.

## 1. FEATURES

- Define project data contracts within the app and share it using a 4-digit token
- Test and validate request/response architecture with detailed contract breach analysis
- Develop new features client-side or server-side independently of one-another while adhering to contract specifications with mock results
- Generate clear contract documentation for distribution with a single click

## 2. INSTALLATION

### - DOWNLOAD INSTALLER

Contractual Desktop can be downloaded from our [website](https://www.contractualapp.io/). Available for Mac OS, Windows, and Linux.

##### OR

### - FORK AND CLONE REPO

Developers who want to dive deeper into the code can fork this repo.

Contributions are not only welcome but highly recommended, we believe that every open source contribution makes the entire community much better.

This application requires a postgreSQL database to function.

Please create your postgreSQL database instane (we recommend elephantSQL as a free option)

#### elephantSQL directions:

After creating your SQL instance, refer to the build.sql file in the root of the app directory. This file will contain the proper query strings to build your own contractual database. Please run these commands in your postgreSQL database.

In order to connect your application to the database instance, go to the _.env_ in the root directory, and paste your query connection string into the DB_KEY variable.

## 3. HOW TO USE

### 3.1 CONTRACT BUILDER

The Contract tab is where the project lead will define or edit the data contract for their application.

Users will select the desired request method option from a dropdown list and input the proper endpoint for their request to be sent to.

Next, the user should add the key names and the expected datatypes of those keys for the request/response objects.

Once the desired input fields are completed, the user can store this endpoint in their data contract by pressing save.

<div align="center">
	<img width="460" height="300" src="https://i.gyazo.com/10acdd901285cf6d105ef2c39cac442b.gif">
	<div><i>Demo_1: add an endpoint</i></div>
</div>
<br>

Alternatively, the user may select from the endpoint drop down list to view any endpoints that have been previously defined.

These endpoints can be edited or deleted using the same method described above.

A notable feature built into this application is the 4-digit identifier token generated uniquely for each created contract.

<div align="center">
	<img width="460" height="300" src="https://gyazo.com/eedcac823fa5811fef3ab9ac5fd67438.gif">
	<div><i>Demo_2: find the token</i></div>
</div>
<br>

As mentioned, this token is generated when a new contract is created.

Members can join, view, and test with previously built data contracts by clicking “Join Contract” in the application settings and inputting a valid token along with the associated contract’s name. A correct contract name and token must be provided at the same time.

Currently, contract edit access is only provided to the user who created the data contract.

<div align="center">
	<img width="460" height="300" src="https://gyazo.com/c1e59cad27fbbc321d2136c7c87e5b65.gif">
	<div><i>Demo_3: import a contract with token</i></div>
</div>
<br>

Once a single data contract endpoint has been created or imported, the user is ready and able to begin testing their fullstack application or export the contract for distribution.

### 3.2 FRONT TESTER

The Frontend tab is used for testing a frontend application’s http request functionality without requiring the addition of any server-side code.

In order for the frontend developer to test with contractual. The will need to sent their requests to our testing server at **PORT 1234**.

Upon sending requests from a frontend application, Contractual will display a log of these requests and whether or not the data contract was breached.

If the request successfully adheres to the data contract, the user will also receive a mock response corresponding to the response defined in the contract builder for that endpoint.

This tool allows frontend developers to test with confidence and receive clear, immediate feedback.

<div align="center">
	<img  src="https://i.gyazo.com/2ed8b8d414dbc5816665f5c5e7c84175.gif">
	<div><i>Demo_4: a successful request</i></div>
</div>
<br>

<div align="center">
	<img  src="https://i.gyazo.com/3f2566560f26a645a48efc66148b0bcc.gif">
	<div><i>Demo_5: a failed request with error analysis</i></div>
</div>
<br>

<div align="center">
	<img  src="https://i.gyazo.com/560a79c735a381bfae9aa1ee8dcd9721.gif">
	<div><i>Demo_6: a mock response based on the pre-defined data contract</i></div>
</div>
<br>

### 3.3 BACK TESTER

The Backend tab is used to test an application’s server-side request handling while being completely decoupled from any sort of front end.

Those familiar with Postman will feel right at home with this tool.

However, Contractual allows you to select from a list of endpoints defined in the data contract with easy to use input fields for the data values.

Upon sending a request, the back tester will render the response from the application and whether or not the data contract was followed, or if the request failed.

<div align="center">
	<img  width="500" height="350" src="https://i.gyazo.com/53c7cdc84568d9f304cc5230de11c12e.gif">
	<div><i>Demo_7: a successful response</i></div>
</div>
<br>

<div align="center">
	<img  width="500" height="350" src="https://i.gyazo.com/0e0420c1a99bac7f1d8894736065e10f.gif">
	<div><i>Demo_8: a failed response with error analysis</i></div>
</div>
<br>

### 3.4 DOCUMENT CREATOR

The document creator is used to view the data contract of the currently active contract in a simplified layout. You are able to export a pdf image of this page for quick and easy distribution to your team using the export button.

<div align="center">
	<img  width="500" height="350" src="https://i.gyazo.com/441cc9515e09e3fae3e271e2fda92ebf.gif">
	<div><i>Demo_9: save the contract to local</i></div>
</div>
<br>
 
---
## 4. ITERATION OPPORTUNITIES
- Create Web application version of contractual
- Add ability to select params for "GET" requests
- Object support for backend mock response
- Add raw test input field for complex request/response body structure
- Add a usage description section for each endpoint in Document Creator page
- Add additional export options to document creator page

## 5. CONTRIBUTORS

[Ernest Leung](https://www.linkedin.com/in/ernestleung52/)[@ernestLeung52](https://github.com/ErnestLeung52)
[George Jeng](https://www.linkedin.com/in/gjenga/)[@gdelaselva](https://github.com/gdelaselva)
[Joseph Amos](https://www.linkedin.com/in/joe-amos/)[@joeamos](https://github.com/joeamos)
[Yankun Song](https://www.linkedin.com/in/yankunsong/)[@yankun-song](https://github.com/yankun-song)
