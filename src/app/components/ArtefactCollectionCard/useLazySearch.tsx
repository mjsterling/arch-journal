import { useMemo, useState } from 'react';

export default function useLazySearch(data: { [key: string]: string }[]) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchTerms = useMemo(() => {
    const _searchTerms: { [key: string]: string } = {};
    data.forEach((datum: { [key: string]: string }) => {
      _searchTerms[datum.name] = JSON.stringify(datum).toLowerCase();
    });
    return _searchTerms;
  }, [data, searchQuery]);

  const filteredData = useMemo<{ [key: string]: string }[]>(
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
