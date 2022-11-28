# BoxOffice

BoxOffice is a website made for browsers and mobile that allows the user to enter the TV shows
they are currently watching, what season and episode they are on, and which streaming service they
are watching it on. Unlike the built-in functionality of streaming services, which save where you currently are, our product allows for multiple people sharing a single service without each user interfering with the watch history/location of the other.

### Build Badges

[![Frontend](https://github.com/mpicazocp/BoxOffice/actions/workflows/frontend.js.yml/badge.svg?branch=main&ci-cd)](https://github.com/mpicazocp/BoxOffice/actions/workflows/frontend.js.yml)

[![Backend](https://github.com/mpicazocp/BoxOffice/actions/workflows/backend.yml/badge.svg?branch=main&ci-cd)](https://github.com/mpicazocp/BoxOffice/actions/workflows/backend.yml)

[![Deployment](https://github.com/mpicazocp/BoxOffice/actions/workflows/main_boxofficecsc307.yml/badge.svg?branch=main&ci-cd)](https://github.com/mpicazocp/BoxOffice/actions/workflows/main_boxofficecsc307.yml)

### UI Prototype

Here is the link to our Figma UI Prototype (last modified on October 27th, 2022): [Figma Prototype](https://www.figma.com/file/2VeI90O1W0TDbL1AnSYx4T/BoxOffice?node-id=0%3A1&t=CyW992dCeruMyrzb-0)

### Wikipages

Here is the link to the BoxOffice wikipage containing our Use Case and UML Class diagrams: [Wikipage](https://github.com/mpicazocp/BoxOffice/wiki)

### Contributing to BoxOffice

To contribute to BoxOffice development, see the following sections:

##### Configuring a Local Repo

![image](https://user-images.githubusercontent.com/46510323/204059226-9f8c734d-e1a3-439f-9806-b90bbb9d1033.png)
To begin contributing, start by cloning the remote repository to your local machine. To do this, open the dropdown menu on the green button labeled `<> Code` at the top of this page, as shown in the image above, and copy the HTTPS git URL. Then, from a terminal/command line window on your local machine, navigate to the desired directory for your local repo, and run the command `git clone <the HTTPS git URL from earlier>`. This will initialize your local repository and copy the files from the remote repo to your device.

##### Style Guides

For frontend work, use the AirBnB JavaScript React style guide: https://airbnb.io/javascript/react/ <br />
For backend work, use the Google JavaScript style guide: https://google.github.io/styleguide/jsguide.html

##### Plugins

ESLint and Prettier JavaScript plugins are configured in the remote repository. Run the command `npm i` in the `react-frontend/` and `express-backend/` directories to install the necessary dependencies on your local repository.

##### Syncing up with MongoDB Atlas

To access the MongoDB Atlas database from your local repository, do the following: <br />
![image](https://user-images.githubusercontent.com/46510323/200495971-e1341336-d400-4800-97e3-fe45e637e525.png)

1. On the BoxOffice Project page on the MongoDB Atlas website, select the 🟨"Database" tab under "Deployment". On this tab, select the 🟧"Connect" button next to the cluster name. Choose "Connect your application", then set the driver and version to "Node.js" and "Version 4.1 or later", respectively. Finally, save the provided connection string. This will be your URI string for the next step. <br /> <br />
2. Create a `.env` file in the root of your local `express-backend/` directory. This file should contain the following: <br />

```
PORT=<the port you want to have open locally to connect to the database>
MONGODB_URI=<the connection string you saved from the previous step>
```

With this done, use `http://localhost:<your .env PORT>` or similar to interact with the database. </br ><br />
To view the collections within the database, do the following:<br />
From the 🟨"Database" tab, click the 🟩"View Monitoring" button, then navigate to the "Collections" tab. From there, you can select between the collections in the database and use the UI to perform search queries.

##### Running the Frontend and Backend

To run the frontend code, navigate to the `react-frontend/` directory in your local repository and run the command `npx start`. This will automatically open your default browser to the BoxOffice website home page.<br /><br />
The backend and database connection are automatically deployed to the BoxOffice Azure web app, but the backend can still be accessed through the local repository. After following the procedure in the "Syncing up with MongoDB Atlas" section, navigate to the `express-backend/` directory in your local repository and run the command `npm run dev`. This will connect you to the MongoDB Atlas database, but your local files will be used for your backend operations instead of those deployed to the web app.
