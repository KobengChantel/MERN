
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }), // Update this with your GraphQL server URL
  cache: new InMemoryCache(),
});

export default client;
