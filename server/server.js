const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// Import Stripe
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51Pw54m04EmYQV5PksSbn68xL972YrtPCPe7krDeu2vYg4EyjUzComS77ORv5vU3ZJ6MkAmKUW8kbc2zyNC2IPzmZ00rvczxzH7'); // Replace with your Stripe secret key

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Define Stripe routes
  app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body; // Amount should be in the smallest currency unit, e.g., cents for USD

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd', // Replace with your currency
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      console.log(`Stripe route available at http://localhost:${PORT}/create-payment-intent`);
    });
  });
};

// Call the async function to start the server
startApolloServer();

