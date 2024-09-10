// // src/apolloClient.js
// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

// const httpLink = createHttpLink({
//   uri: 'http://localhost:3000/graphql',  // Replace with your actual backend GraphQL URL
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('auth_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// export default client;
