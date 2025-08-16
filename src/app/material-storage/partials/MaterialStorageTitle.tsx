export const MaterialStorageTitle: MaterialStorageTitle = ({ title }) => (
  <h3 className="text-lg text-center md:text-left font-medium w-full md:col-span-5 text-orange-100 my-4">{title}</h3>
);

type MaterialStorageTitle = React.FC<{ title: string }>;
