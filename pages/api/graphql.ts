import { ApolloServer } from 'apollo-server';
import { loadSchema } from '@graphql-tools/load';
import { UrlLoader } from '@graphql-tools/url-loader';
import { stitchSchemas } from '@graphql-tools/stitch';
import fetch from 'node-fetch';

async function startServer() {
  const magentoSchema = await loadSchema('http://demomagento.com/graphql', {
    loaders: [new UrlLoader()],
    fetch,
  });

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
