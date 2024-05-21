import { useNavigate } from "react-router-dom";
import { useState } from "react";

import MagnifyingGlassIcon from "../assets/MagnifyingGlassIcon";

const SearchBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(search);
    setSearch("");
    navigate(`/search/${search}`);
  };

  return (
    <>
      <form
        className="flex justify-center items-center"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="search" className="sr-only font-medium text-sm">
          Search
        </label>
        <div className="relative w-full">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            className="block w-full text-md rounded-[20px] py-1.5 pl-3 pr-10 md:border-[#2B3B43] md:border-2"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            className="absolute top-0 right-0 flex h-full items-center mr-3 fill-[#2B3B43]"
            type="submit"
          >
            <MagnifyingGlassIcon />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
