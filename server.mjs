import { ApolloServer } from 'apollo-server';
import { loadSchema } from '@graphql-tools/load';
import { UrlLoader } from '@graphql-tools/url-loader';
import { stitchSchemas } from '@graphql-tools/stitch';
import fetch from 'node-fetch';
import env from 'dotenv';
env.config();
/*
const ApolloServer = require('apollo-server');
const loadSchema = require('@graphql-tools/load');
const UrlLoader = require('@graphql-tools/url-loader');
const stitchSchemas = require('@graphql-tools/stitch');
import fetch from 'node-fetch';
*/ 
async function startServer() {
  console.log('Graphql EndPoint: ', process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT);
  const magentoSchema = await loadSchema(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    loaders: [new UrlLoader()],
    fetch,
  });
  /*
  const magentoSchema = await loadSchema('http://localhost:4000/graphql', {
    loaders: [new UrlLoader()],
    fetch,
  });
  */

  const contentfulSchema = await loadSchema('http://wordpresssite.com/graphql', {
    loaders: [new UrlLoader()],
    fetch,
  });

  const gatewaySchema = stitchSchemas({
    // subschemas: [{ schema: magentoSchema } , { schema: contentfulSchema }],
    subschemas: [{ schema: magentoSchema }],
  });

  const server = new ApolloServer({ schema: gatewaySchema });

  return await server.listen(8080);
}

startServer().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
