import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Article } from 'modules/article/article';
import { Action } from 'modules/users/action.enum';
import { User } from 'modules/users/user';

type Subjects = InferSubjects<typeof Article | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: Pick<User, 'userId' | 'isAdmin'>) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    can(Action.Update, Article, { authorId: user.userId });

    cannot(Action.Delete, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
