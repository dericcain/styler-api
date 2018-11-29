module.exports = fastify => {

  // Get the styles for a company
  fastify.get('/styles/:customer/environment/:env', async function (req, res) {
    console.log(this);
    const { company, env } = req.params;
    const results = await stylesCollection.find({ company, env })
  });

  // Create the styles object
  fastify.post('/styles', async function (req, res) {
    const stylesCollection = this.mongo.db.collection('styles');
    try {
      const results = await stylesCollection.insertOne(req.body);

      return {
        message: 'Success!',
        results: results.ops[0],
      };
    } catch (error) {
        res.send({
          message: 'The record was not inserted',
          error,
        });
    }
  });
}
