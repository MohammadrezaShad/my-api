import { IsMongoId, ValidationOptions } from 'class-validator';

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    IsMongoId(validationOptions)(object, propertyName);
  };
}
