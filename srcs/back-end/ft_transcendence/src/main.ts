import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { config } from 'dotenv';
import { generateSecretKey } from './utils/auth.utils';


async function bootstrap() {
  config();
  process.env.SECRET_KEY = generateSecretKey().toString('hex');
  const app = await NestFactory.create(AppModule);
  await app.init()
  const {schema} : GraphQLSchemaHost = app.get(GraphQLSchemaHost);


  const server = new ApolloServer({
    schema
  });
  
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.token }),
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
}

bootstrap();