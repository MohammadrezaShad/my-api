import { ObjectId } from 'mongodb';

export function objectIdsToStringList(list: ObjectId[]) {
  return list.map(item => item.toHexString());
}
