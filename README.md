# BoxOffice
This is the development repository for the BoxOffice application.

### Buttons 
[![Frontend](https://github.com/mpicazocp/BoxOffice/actions/workflows/frontend.js.yml/badge.svg?branch=main&ci-cd)](https://github.com/mpicazocp/BoxOffice/actions/workflows/frontend.js.yml)

[![Backend](https://github.com/mpicazocp/BoxOffice/actions/workflows/backend.yml/badge.svg?branch=main&ci-cd)](https://github.com/mpicazocp/BoxOffice/actions/workflows/backend.yml)

### Style Guides
For frontend work, use the AirBnB JavaScript React style guide: https://airbnb.io/javascript/react/ <br />
For backend work, use the Google JavaScript style guide: https://google.github.io/styleguide/jsguide.html

### Plugins
ESLint and Prettier JavaScript plugins are configured in the remote repository. Run the command ```npm i``` in the ```react-frontend/``` and ```express-backend/``` directories to install the necessary dependencies on your local repository.

### Syncing up with MongoDB Atlas
To access the MongoDB Atlas database, do the following: <br />
![image](https://user-images.githubusercontent.com/46510323/200495060-fc92ce2d-375c-4bb1-9838-3c2dbf51e77d.png)
1) On the BoxOffice Project page on the MongoDB Atlas website, select the 🟨"Database" tab under "Deployment". On this tab, select the 🟨"Connect" button next to the cluster name. Choose "Connect your application", then set the driver and version to "Node.js" and "Version 4.1 or later", respectively. Finally, save the provided connection string. This will be your URI string for the next step. <br /> <br />
2) Create a ```.env``` file in the root of your local ```express-backend/``` directory. This file should contain the following: <br />
```
PORT=<the port you want to have open locally to connect to the database>
MONGODB_URI=<the connection string you saved from the previous step>
```
With this done, use ```http://localhost:<your .env PORT>``` or similar to interact with the database. </br ><br />
To view the collections within the database, do the following:<br />
From the 🟨"Database" tab, click the 🟩"View Monitoring" button, then navigate to the "Collections" tab. From there, you can select between the collections in the database and use the UI to perform search queries.
