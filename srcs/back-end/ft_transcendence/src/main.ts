import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { config } from 'dotenv';
import { generateSecretKey } from './utils/auth.utils';
// import * as cors from 'cors';


async function bootstrap() {
  config();
  process.env.SECRET_KEY = generateSecretKey().toString('hex');

  const app = await NestFactory.create(AppModule);  
  
  await app.init()
  const {schema} : GraphQLSchemaHost = app.get(GraphQLSchemaHost);


  const server = new ApolloServer({
    schema,
    
  });

server
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      console.log(req.headers);
      const cookie = req.headers.authorization
      return {cookie};
    },
    listen: { port: 4000 },
  });
  
console.log(`🚀 Server ready at ${url}`);
}

bootstrap();