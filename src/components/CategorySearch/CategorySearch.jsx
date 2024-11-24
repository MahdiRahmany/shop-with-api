import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ClickClose from "../ClickClose/ClickClose";

const CategorySearch = ({ products, onSearch, toggle }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const categories = [
    "All",
    "Men's Clothing",
    "Women's Clothing",
    "Jewelry",
    "Electronics",
  ];

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredSuggestions = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setSuggestions(filteredSuggestions);

    onSearch(filteredSuggestions);
  };

  return (
    <div className="bg-blue-100 w-full flex justify-between items-center p-4 shadow-lg rounded-xl">
      <div>
        <ul className="flex gap-4">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer font-semibold transition-colors ${
                selectedCategory === category
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative" toggle={ClickClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center bg-gray-200 px-4 py-2 rounded-full shadow-md border border-gray-300"
        >
          <FaSearch className="tex-gray-600 cursor-pointer" />
          &nbsp;
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-transparent outline-none  text-gray-800 placeholder-gray-800 mr-2"
          />
        </div>

        {searchTerm && suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-blue-100 border border-gray-300 shadow-lg mt-2 rounded-xl overflow-y-auto max-h-[calc(100vh-16rem)] scrollbar-hidden">
            <ul>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="p-2 hover:bg-gray-300 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(suggestion.title);
                    setSuggestions([]);
                    onSearch([suggestion]);
                  }}
                >
                  {suggestion.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySearch;
