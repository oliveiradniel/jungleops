export const FieldNameValues = [
  'title',
  'description',
  'term',
  'priority',
  'status',
  'userIds',
] as const;

export type FieldName = (typeof FieldNameValues)[number];
