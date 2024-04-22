import { IoChevronForward as ChevronForward } from "react-icons/io5";

export interface SearchResultItem {
  id: string;
  sku: string;
  image: string;
  name: string;
  description: string;
}

const SearchResultCard = ({
  sku,
  name,
  image,
  description,
}: SearchResultItem) => {
  return (
    <div className="flex items-center gap-5 border-b py-5">
      <div className="overflow-hidden rounded bg-slate-200">
        <img
          src={image}
          alt={name}
          className="h-full w-16 object-cover md:w-24"
        />
      </div>
      <div className="flex-1">
        <div className="text-sm text-brand">{sku}</div>
        <div className="font-semibold">{name}</div>
        <div className="line-clamp-1 text-sm text-textSecondary">
          {description}
        </div>
      </div>
      <div className="flex w-10 items-center justify-center md:w-20">
        <ChevronForward className="size-5 text-brand" />
      </div>
    </div>
  );
};

export default SearchResultCard;
