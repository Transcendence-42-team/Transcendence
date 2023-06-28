import { Resolver, Query, Args, Context } from '@nestjs/graphql'
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class CookiesResolver {
  @Query(() => String)
  async getCookieByName(@Context() context, @Args('cookieName') cookieName: string) {
    const { req } = context;
    const cookieValue = req.cookies[cookieName];

    if (!cookieValue) {
      throw new NotFoundException('Cookie not found');
    }

    return cookieValue;
  }
}
