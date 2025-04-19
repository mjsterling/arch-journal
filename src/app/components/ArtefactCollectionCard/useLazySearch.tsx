import { useMemo, useState } from 'react';

export default function useLazySearch<T extends { name: string }>(data: T[]) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchTerms = useMemo(() => {
    const _searchTerms: { [key: string]: string } = {};
    data.forEach((datum: T) => {
      _searchTerms[datum.name] = JSON.stringify(datum).toLowerCase();
    });
    return _searchTerms;
  }, [data]);

  const filteredData = useMemo<T[]>(
    () => data.filter((datum) => searchTerms[datum.name].includes(searchQuery)),
    [data, searchTerms, searchQuery]
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  return {
    filteredData,
    searchQuery,
    handleSearch,
    clearSearch: () => setSearchQuery(''),
  };
}
