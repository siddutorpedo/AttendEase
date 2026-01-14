import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const AttendanceDistribution = ({ present, absent }) => {
  const data = [
    { name: `Present (${Math.round((present / (present + absent)) * 100)}%)`, value: present },
    { name: `Absent (${Math.round((absent / (present + absent)) * 100)}%)`, value: absent }
  ];

  const COLORS = ['#105cb9', '#ef4444'];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Overall Attendance Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name }) => name}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceDistribution;
