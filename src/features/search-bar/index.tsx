import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { FiSearch as SearchIcon } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { selectSearchTerm } from "@/store/products/selectors";
import { productActions } from "@/store/products/slice";
import Button from "@components/base/Button";
import { AllProducts } from "@utils/endpoints";

const Searchbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const searchTerm = useSelector(selectSearchTerm);
  const suggestionBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggesionBox, setShowSuggesionBox] = useState(false);

  const setSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(productActions.setSearchTerm(e.currentTarget.value));
  };

  const handleSearchBtn = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${searchTerm}`);
    }
  };

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (!suggestionBoxRef.current?.contains(event.target as Node)) {
        setShowSuggesionBox(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("mousedown", handleOutSideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [suggestionBoxRef]);

  const suggestions = queryClient.getQueryData<AllProducts>(["all-products"]);
  const filteredSuggestion = useMemo(() => {
    return suggestions?.filter(({ name }) =>
      name?.toLowerCase()?.trim()?.includes(searchTerm?.toLowerCase().trim()),
    );
  }, [suggestions, searchTerm]);

  const handleSugesstionClick = (productName: string) => {
    handleSearchBtn(productName);
    setShowSuggesionBox(false);
  };

  return (
    <div className="relative w-full flex-1 md:flex-[0.95]">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-4 overflow-hidden rounded-full bg-bgSecondary px-4 py-2 md:px-6"
      >
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search for products"
          className="h-10 w-full bg-transparent outline-none"
          onFocus={() => setShowSuggesionBox(true)}
        />
        <Button
          type="submit"
          onClick={() => handleSearchBtn(searchTerm)}
          className="flex h-full items-center gap-2 rounded-full"
        >
          <SearchIcon className="h5 h-5" />
          Search
        </Button>
      </form>

      {showSuggesionBox &&
        !!searchTerm.trim().length &&
        !!filteredSuggestion?.length && (
          <div
            ref={suggestionBoxRef}
            className="absolute mt-2 flex max-h-32 min-h-10 w-full items-center justify-center overflow-y-auto rounded-md border bg-bgPrimary"
          >
            <ul className="h-full w-full">
              {filteredSuggestion?.map(({ id, name }) => {
                return (
                  <li
                    key={id}
                    onClick={() => handleSugesstionClick(name)}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-bgSecondary"
                  >
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
    </div>
  );
};

export default Searchbar;
