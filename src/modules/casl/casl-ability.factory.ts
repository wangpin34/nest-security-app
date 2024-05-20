import {
  defineAbility,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { Article } from 'models/article.dto';
import { User } from 'models/user.dto';
import { Action } from 'modules/users/action.enum';

type Subjects =
  | InferSubjects<Article | typeof Article | typeof User | User>
  | 'all';

//export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: Pick<User, 'id' | 'roles'>) {
    const ability = defineAbility(
      (can, cannot) => {
        if (user.roles.includes($Enums.Role.Admin)) {
          can(Action.Manage, 'all'); // read-write access to everything
        } else {
          can(Action.Read, 'all'); // read-only access to everything
        }

        can(Action.Update, Article, { authorId: user.id });

        cannot(Action.Delete, Article, { published: true });
      },
      {
        detectSubjectType: (object) =>
          object.constructor as ExtractSubjectType<Subjects>,
      },
    );
    return ability;
    // return build({
    //   // Read https://casl.js.org/v6/en/guide/subject-type-detection#use-classes-as-subject-types for details
    //   detectSubjectType: (item) =>
    //     item.constructor as ExtractSubjectType<Subjects>,
    // });
  }
}
