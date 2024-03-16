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
npm i react-router-dom
npm i @material-tailwind/react
npm i react-icons

## Additional resources
# This is react-icons library (already installed)
https://react-icons.github.io/react-icons/search/#q=drone