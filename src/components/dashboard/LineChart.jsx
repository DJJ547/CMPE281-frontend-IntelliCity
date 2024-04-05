import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import LineChartDropdown from './LineChartDropdown'


const Chart = ({ data }) => {
  const [selectedView, setSelectedView] = useState('daily');

  const handleChange = (view) => {
    setSelectedView(view);
  };

  return (
    <div>
      <LineChartDropdown handleChange={handleChange} />
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data[selectedView]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;