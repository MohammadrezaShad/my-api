import { ObjectId } from 'mongodb';

export function stringListToObjectIds(list: string[]) {
  return list.map(item => new ObjectId(item));
}
