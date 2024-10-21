# Wikipedia Search Results

This is a simple app to query the articles from wikepedia API. This project is developed using node.js express server which in turns call the public wikipedia API and responds with the basic info.

## Available Scripts

In the project directory to install the libraries, you can run:

### `npm install`

Then to run the project, you can run:

### `npm start`

# Project Tech and Project folder structure

- This project uses some important libraries like
- express: Server,
- nodeCache: For storing the search results so that incessary API calls are avoided,
- rateLimit: This makes sure that the user doesnt overload the API requests,
- cors: Cross-origin resource sharing (CORS) is a browser mechanism which enables controlled access to resources located outside of a given domain.
- Axios(Calling API): Axios is a popular JavaScript library used for making HTTP requests from a web browser or Node. js. It simplifies the process of sending asynchronous HTTP requests to a server, and also handles the response.
