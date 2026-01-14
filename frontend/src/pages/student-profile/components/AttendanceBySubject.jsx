import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AttendanceBySubject = ({ data }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Attendance by Subject</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="subject" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
            labelStyle={{ color: 'var(--foreground)' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value, entry) => (
              <span style={{ color: entry.dataKey === 'attendance' ? '#1044c6' : '#ef4444', fontWeight: '500' }}>
                {value}
              </span>
            )}
          />
          <Bar dataKey="attendance" fill="#1044c6" name="Classes Attended" />
          <Bar dataKey="absent" fill="#ef4444" name="Absences" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceBySubject;
