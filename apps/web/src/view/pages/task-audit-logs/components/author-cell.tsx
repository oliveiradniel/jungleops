import type { Row } from '@tanstack/react-table';

interface AuthorCellProps {
  row: Row<any>;
}

export function AuthorCell({ row }: AuthorCellProps) {
  const { username, email } = row.original.author;

  return (
    <div className="flex flex-col">
      <span>{username}</span>
      <span className="text-muted-foreground text-xs">{email}</span>
    </div>
  );
}
