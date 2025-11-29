import { useRouter, useSearch } from '@tanstack/react-router';

import type { FileRouteTypes } from '@/routeTree.gen';

interface PaginationSearch {
  page?: number;
  size?: number;
}

interface UsePaginationProps {
  from: FileRouteTypes['id'];
  to: FileRouteTypes['to'];
}

export function usePagination({ from, to }: UsePaginationProps) {
  const search = useSearch({ from }) as PaginationSearch;
  const router = useRouter();

  const page = Number(search.page) || 1;
  const size = Number(search.size) || 10;

  function goToPage(page: number) {
    router.navigate({
      to,
      search: { ...search, page },
    });
  }

  function handlePreviousTasksPage() {
    router.navigate({
      to,
      search: { page: page - 1 },
    });
  }

  function handleNextTasksPage() {
    router.navigate({
      to,
      search: {
        page: page + 1,
      },
    });
  }

  return { page, size, goToPage, handlePreviousTasksPage, handleNextTasksPage };
}
