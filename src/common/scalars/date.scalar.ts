import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', type => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  parseValue(value: unknown): Date {
    return new Date(value as number); // value from the client
  }

  serialize(value: unknown): number {
    return (value as Date).getTime(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): any {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}
