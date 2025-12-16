import React from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AcademicPerformance = ({ performanceData, subjectGrades }) => {
  return (
    <div className="bg-card rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="TrendingUp" size={24} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">Academic Performance</h2>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-4">Attendance vs Performance Correlation</h3>
        <div className="w-full h-64" aria-label="Attendance and Performance Trend Line Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="Attendance %" 
              />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                name="Performance %" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-4">Subject-wise Grades</h3>
        <div className="w-full h-64" aria-label="Subject Grades Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectGrades}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="subject" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem'
                }} 
              />
              <Legend />
              <Bar dataKey="grade" fill="var(--color-primary)" name="Grade %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AcademicPerformance;