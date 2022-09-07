# Frontend using React

> Start build app using create-react-app
> Navigation using Link and app.js use Router-Routes-Route-elements using react-router-dom

## npx create-react-app my-blog --use-npm

# npm install --save react-router-dom

react-router-dom for router
Error "Error: A <Route> is only ever to be used as the child of <Routes> element"
In version 6, however, the Route components now need to be rendered within a Routes component (which is an upgrade from the v5 Switch component).
https://stackoverflow.com/questions/69832748/error-error-a-route-is-only-ever-to-be-used-as-the-child-of-routes-element

### articleContent is not part of route. ie is not one of the pages. so, it is used for query parameters only

using match.params.title. so import path cannot container '/pages/' instead '/articleContent' .

# Backend Using NodeJs - express module

```js
$ npm install --save express
To support es6 syntax
$ npm install --save-dev @babel/core @babel/node @babel/preset-env
.babelrc contains
{
"presets": ["@babel/preset-env"],
}
```

Start our server
$ npx babel-node src/server.js
Production: npde src/server.js
PORT process.env.PORT || 8000

Open postman/insomnia and play with get and post endpoints sending
json body as your name on basic express server.

```js
npm install --save-dev body-parser
import bodyParser from 'body-parser';

app.use(bodyParser.json());
auto update using nodemon
npm install --save-dev nodemon
npx nodemon --exec npx babel-node src/server.js
```
Note: babel used to be compatible with es6 syntax and modules.
### Deploy on Heroku:

Add Procfile with content:- web: npm start    
add empty package.json oR with "start: node src/server.js". We donot need nodemon on heroku.    
Add PORT var with "process.env.PORT || 8000"   
Add a Buildpack - node buildpack
Adding Configvars in Settings, Here using values from .env in node apps
