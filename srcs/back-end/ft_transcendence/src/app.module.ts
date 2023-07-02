import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { ChanelModule } from './chanel/chanel.module';
import { MessagesModule } from './messages/messages.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ContactsModule } from './contacts/contacts.module';
import 	{AuthMiddleware} from './utils/auth.utils'
import { join } from 'path';

@Module({
	imports: [
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			useFactory: () =>({
				autoSchemaFile: join(process.cwd(), 'src/schemas.gql'),
				playground: true,
				context: ({ req, res }) => ({ req, res }),
			})
        }),
		UsersModule,
		ChanelModule,
		MessagesModule,
		ContactsModule
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
	  consumer
		.apply(AuthMiddleware)
		.forRoutes({ path: '*', method: RequestMethod.ALL });
	}
  }