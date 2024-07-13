import { PipelineStage } from 'mongoose';

import { isNullOrUndefined } from './is-null-or-undefined';

export interface ExistingStringFilter {
  field: string;
  isExist?: boolean;
}

export const getExistingStringFilter = ({
  field,
  isExist,
}: ExistingStringFilter): PipelineStage[] => {
  const filter: PipelineStage[] = !isNullOrUndefined(isExist)
    ? [
        isExist === false
          ? {
              $match: {
                $or: [
                  { [`${field}`]: { $exists: false } },
                  { [`${field}`]: null },
                  { [`${field}`]: '' },
                ],
              },
            }
          : {
              $match: {
                $and: [
                  { [`${field}`]: { $exists: true } },
                  { [`${field}`]: { $ne: null } },
                  { [`${field}`]: { $ne: '' } },
                ],
              },
            },
      ]
    : [];
  return filter;
};
