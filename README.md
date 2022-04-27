# ***CONTRACTUAL***
---
## BRIEF

Contractual is a tool designed to complement team-based development for web applications that utilize JS and Node.JS. Contractual's design philosophy is centered around what we call "Contract driven development".  Contract refers to the data contract between client and server. Contractual allows development teams to define their applications data contract using a simple user interface  Additionally, frontend/backend development teams will be able to test their applications confidently in a decoupled manner.

---
## GETTING STARTED

### DOWNLOAD 

Click here to download Contractual to your desktop. LINK

##### OR
### FORK AND COPY REPO

Fork this repo and copy down to your local machine

This application requires a postgresQL database to function.

Please create your postgresQL database instane (we recommend elephantSQL as a free option)

#### elephantSQL directions: 

After creating your SQL instance, refer to the build.SQL file in the root of the app directory. This file will contain the proper query strings to build your own contractual database. Please run these commands in your postgresQL database.

In n order to connect your application to the database instance follow the filepath: ./src/express/user_info_server/models/dbModel.js in your cloned application. Here you will paste your query connection string into the PG_URI variable.

SHOULD WE USE NODE.ENV FILE HERE INSTEAD AND HAVE USERS INPUT THEIR STRINGS AND PORTS THERE??

---
## HOW TO USE
	
### CONTRACT BUILDER

The Contract builder page is where a user will define the data contract for their application. Toward the top, the user will select the desired method and input the proper endpoint for their request(ex: /feed). Currently, Contractual supports request objects that include JS numbers, booleans, strings, and arrays of depth 1. The user will add the key names, as well as, the expected datatypes of those keys for the request and response objects.

IMAGE/GIF HERE

Alternatively, the user may select from the endpoint drop down list to view any endpoints that have been previously defined.

### FRONT TESTER

The Front tester tab is used for testing your front end application while completely decoupled from the backend application. Upon switching your currently active data contract, we will connect our testing server to the frontend application via web hook. 

In order for the frontend developer to test with contractual. The will need to sent their requests to our testing server at port 1234

IMAGE example
ex: http://localhost:1234/<yourEndpointHere>

IMAGE/GIF HERE

Upon sending requests from the front end, Contractual will build a log of these requests and whether or not adhered to the data contract or not. If the request followed the data contract, the user will also receive a mock response corresponding the response defined in the contract builder for that endpoint.

### BACK TESTER

The back tester  is used to test your backend application while completely decoupled from any sort of front end. You can think of its functionality similarly to postman. However, Contractual allows you to select from a list of endpoints defined in the data contract with easy to use input fields for the data values. Upon sending a request, the back tester will render the response from the application and whether or not the data contract was followed.

IMAGE/GIF HERE

### DOCUMENT CREATOR

The document creator is used to view the data contract of your currently active project in a simplified layout. You are able to export a pdf image of this page using the export button.

IMG/GIF HERE

 NOTE: Currently, Contractual only supports pdf export
 
---
## ITERATION OPPORTUNITY/BUGS

- Add ability to select params for "GET" requests
- Object support for backend mock response
- Add raw test input field for complex request/response body structure
- Add a usage description section for each endpoint in Document Creator page
- Add additional export options to document creator page
- Create Web application version of contractual
