This app is intended to be a shopping cart application where you can select from items and add them to a cart.
It is a React/Redux application created with create-react-app.

To set started clone the project and run: npm install
Once everything has installed simply run: npm run start

The items are pulled from an API, however the API GET requests was returning errors so there are 2 API links that will work for this application. The API link is located in the MainPage.js file in the componentDidMount hook.

Here is the myJSONserver link(more reliable, but less items): https://my-json-server.typicode.com/steelmasterj/myjsonserver/data
Here is the original mocki link (more items, but less reliable): https://api.mocki.io/v1/b8bead03

Use the myJSONserver link or the mocki link, whichever one is chosen will need to be inserted into the "componentDidMount" hook in the MainPage.js file.
The default API call is to myJSONserver.
