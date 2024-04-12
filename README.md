# CMPE281 Project "IntelliCity" Front-end
This "Smart City Traffic AI Cloud Platform" project aims to improve traffic management in smart cities by developing a cloud-based system that utilizes artificial intelligence (AI) and big data collected from CCTV cameras, IoT devices, and drone images. This platform will provide functionalities for both city traffic agents and the public clients.

## Frontend Project Layout
```
cmpe281frontend/
├── public/
│   ├── index.html
├── src/
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   ├── components/
│   │   ├── PageLayout.js
│   │   ├── Sidebar.jsx
│   ├── medias/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├──Login.jsx
│   │   │   ├──Logout.jsx
│   │   │   ├──signup.jsx
│   │   ├── CameraManager.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DroneManager.jsx
│   │   ├── IotManager.jsx
│   ├── utils/
├── gitignore
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── tailwindcss.config.js
```
  
## How to run our React Front-end:
- install node.js. https://nodejs.org/en
- after installation of node.js. run the following command to install the dependencies and neccessary files for this project.
```
npm install
```
- Now you can start your frontend locally with:
```
npm start
``` 

## Please list all libraries that you've installed before pushing into GitHub repo
- npm i react-router-dom
- npm i @material-tailwind/react
- npm i react-icons
- npm i -S @react-google-maps/api
- npm install dotenv --save
- npm i recharts
- npm install react-switch
- npm i @heroicons/react
- npm i --save @fortawesome/free-solid-svg-icons

# Useful resources
## react-icons library
https://react-icons.github.io/react-icons/search/#q=drone

## Font-Awesome Icons library
https://fontawesome.com/icons

## Google Fonts Icons
https://fonts.google.com/icons

## recharts chart and graph library
https://recharts.org/en-US

## YT tutorial and source code for button animations
https://www.youtube.com/watch?v=lOo8diyD2fg
https://www.hover.dev/components/links

## react-google-maps/api
https://www.npmjs.com/package/@react-google-maps/api

## Dumentation of react-google-maps/api (the one posted on npmjs.com doesn't work)
https://web.archive.org/web/20230701010714mp_/https://react-google-maps-api-docs.netlify.app/#section-introduction

## note: for Google Maps API, You'll need a Google Maps API key to access Google Maps services. To obtain an API key, follow these steps:
Go to the Google Cloud Console.
Create a new project or select an existing one.
Enable the "Google Maps JavaScript API" for your project.
Create an API key and restrict it if needed (for security)