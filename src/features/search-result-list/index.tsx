import Spinner from "@components/base/Spinner";
import SearchResultCard, { SearchResultItem } from "./SearchResultCard";

interface Props {
  data?: SearchResultItem[];
  loading?: boolean;
}

const SearchResultList = ({ data, loading }: Props) => {
  return (
    <div className="mt-2 flex flex-col">
      {loading && (
        <div className="flex h-[40vh] w-full items-center justify-center">
          <Spinner className="text-3xl" />
        </div>
      )}
      {data?.map((props) => <SearchResultCard key={props.id} {...props} />)}
    </div>
  );
};

export default SearchResultList;
