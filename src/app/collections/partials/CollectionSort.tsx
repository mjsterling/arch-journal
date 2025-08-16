import { RadioGroup } from '@/components';
import { useCollectionsPageData } from '../page';
import { CollectionSortOptions } from '@/data/constants';

export const CollectionSort: React.FC = () => {
  const { sort, setSort } = useCollectionsPageData();

  return (
    <RadioGroup
      label="Sort by:"
      options={[
        { key: CollectionSortOptions.LevelToComplete, label: 'Level' },
        { key: CollectionSortOptions.Collector, label: 'Collector' },
        { key: CollectionSortOptions.Digsite, label: 'Digsite' },
        { key: CollectionSortOptions.Name, label: 'Alphabetical' },
      ]}
      value={sort}
      setValue={setSort}
    />
  );
};
