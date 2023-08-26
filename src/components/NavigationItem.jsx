import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

const NavigationItem = ({ category }) => {
  return (
    <li className="nav-item mr-2 font-bold relative">
      <Link to={`products/${category.category_alias_name}/1`}>{category.category_name}</Link>
      {category.subcategories && (
        <ul className="subcategories hidden absolute bg-white z-50 w-30 p-4">
          {category.subcategories.map((subcategory) => (
            <NavigationItem key={subcategory.category_id} category={subcategory} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default NavigationItem;
