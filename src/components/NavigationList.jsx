import React from "react";
import NavigationItem from "./NavigationItem"; // Điều chỉnh đường dẫn tới file NavigationItem.js

const NavigationList = ({ categoryTree }) => {
  return (
    <div id="navbar">
      <ul id="nav-list" className="flex relative">
        {categoryTree.map((category) => (
          <NavigationItem key={category.category_id} category={category} />
        ))}
      </ul>
    </div>
  );
};

export default NavigationList;
