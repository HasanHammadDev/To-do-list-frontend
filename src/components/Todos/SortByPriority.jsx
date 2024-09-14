import React from 'react';

const SortByPriority = ({ onSortChange }) => {
  const handleChange = (event) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <label className="mr-2">Sort By:</label>
      <select
        className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        defaultValue="default"
      >
        <option value="default">Default</option>
        <option value="priority-asc">Priority: Low to High</option>
        <option value="priority-desc">Priority: High to Low</option>
        <option value="due-date-asc">Due Date: Ascending</option>
        <option value="due-date-desc">Due Date: Descending</option>
      </select>
    </div>
  );
};

export default SortByPriority;