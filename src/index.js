require('dotenv').config();
const fastify = require('fastify');
const fastifyMongo = require('fastify-mongodb');
const routes = require('./routes');

const PORT = 8080;
const app = fastify();

app.register(fastifyMongo, {
  // force to close the mongodb connection when app stopped
  // the default value is false
  forceClose: true,
  useNewUrlParser: true,
  url: process.env.MONGO_URL,
});

routes(app);

app.listen(PORT, err => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log(`Started on port: ${PORT}`);
})
