import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const CategorySearch = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Men's Clothing",
    "Women's Clothing",
    "Jewelry",
    "Electronics",
  ];

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

      <div className="flex items-center bg-gray-200 px-4 py-2 rounded-full shadow-md border border-gray-300">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-gray-800 placeholder-gray-600 mr-2"
        />
        <FaSearch className="text-gray-600 cursor-pointer" />
      </div>
    </div>
  );
};

export default CategorySearch;
