import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { ChanelModule } from './chanel/chanel.module';
import { MessagesModule } from './messages/messages.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ContactsModule } from './contacts/contacts.module';
import { CookiesResolver } from './cookies/cookies.resolver';
import { join } from 'path';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: join(process.cwd(), 'src/schemas.gql'),
            driver: ApolloDriver,
            playground: true,
        }),
		UsersModule,
		ChanelModule,
		MessagesModule,
		ContactsModule
	],
	providers:[CookiesResolver],
})
export class AppModule {}