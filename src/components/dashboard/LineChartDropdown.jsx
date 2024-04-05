import React, { useState } from 'react';

const ChartDropdown = ({ handleChange }) => {
  const [selectedOption, setSelectedOption] = useState('daily');

  const handleSelect = (option) => {
    setSelectedOption(option);
    handleChange(option);
  };

  return (
    <div>
      <label htmlFor="chart-dropdown">View:</label>
      <select id="chart-dropdown" value={selectedOption} onChange={(e) => handleSelect(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
};

export default ChartDropdown;