# PAM APPLICATION
# Personal Assitant Manager-- PAM-APP

## API: 
API in production https://git.heroku.com/p-a-m-app.git
API in development https://localhost:30001/

API FOR QUOTES http://quotes.rest/qod.json
endpoint https://theysaidso.com/api/#qod

## AUTHOR
email-sebastianchan809@gmail.com
github-https://github.com/Sebthecreator95
linked-in-https://www.linkedin.com/in/sebastian-chan-92020/

## INTRODTION

PAM APP is a virtual assistant where users can sign up and log in and view saved events by date.
view everyday tasks, make new  daily tasks, and new events to help everyday users keep up with their lifestyle
by not forgeting important events or notes that one might have.
A user can easily navigate threw the calendar which pulls up the events by date of the calendar.
And letting user know if there are any events on the specified date.
Using a home made backend api which retrieves data from database and spreads it to the frontend. And also uses React calendar to keep track of the date and time.

## Who uses PAM

PAM is designed for evryday users. From busy dusiness man to an old retire forgetting to take there medicine.


## GENERAL DESCRIPTION
A full-sack web application
created with Javascript and postgres database
Backend is created with Express.js a framework based on NodeJS
Frontend is created with React.js
backend makes database queries with models
Front end requests data from backend API receives the data and spreads data threw page using useState and useEffect

### BUILT WITH

-PostGres
-Node.js
-Express.js
-React.js
-Javascript
-SQL
-HTML
-CSS
-Surge
-Heroku



### DATABASE

backend consists of a 2 postgres databases
pam_db for production and development, pam_test_db for testing
setting up tables with psql pam_db < pam.sql


### BACKEND

npm i 
to install backend dependencies
set up a enviromental variable with process.env.SECRET_KEY for secret key

"dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "colors": "^1.4.0",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "jsonschema": "^1.4.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "pg": "^8.7.1"
}

    "npm start": "node server.js",
    "npm dev #": "NODE_ENV=development nodemon server.js",
    "npm test": "jest -i"

### FRONTEND

Frontend template with React:
react — generated template with a common React app.
react-ts — generated template with a TypeScript version of the React app.
npm i
to install frontend dependencies

"dependencies": {
    "@devexpress/dx-react-core": "^2.7.6",
    "@devexpress/dx-react-scheduler": "^2.7.6",
    "@devexpress/dx-react-scheduler-material-ui": "^2.7.6",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "axios": "^0.21.4",
    "bootstrap": "^5.1.1",
    "jsonwebtoken": "^8.5.1",
    "react": "^17.0.2",
    "react-bootstrap": "^1.6.3",
    "react-calendar": "^3.4.0",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.2.1",
    "react-scripts": "4.0.3",
    "reactstrap": "^8.10.0",
    "uuidv4": "^6.2.12",
    "web-vitals": "^1.1.2"
  }



    "npm start": "react-scripts start", : run app
    "npm build": "react-scripts build", : build app
    "npm test": "react-scripts test", : run all tests
    "npm eject": "react-scripts eject"
    "npm surge": "REACT_APP_BASE_URL=https://p-a-m-app.herokuapp.com npm run build && cp build/index.html build/200.html && surge build p-a-m.surge.sh && echo http://p-a-m.surge.sh"  : deploy on surge