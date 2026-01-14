import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', roll: '001', email: 'john@example.com', branch: 'BCA' },
    { name: 'Jane Smith', roll: '002', email: 'jane@example.com', branch: 'BCA' },
    { name: 'Bob Johnson', roll: '003', email: 'bob@example.com', branch: 'BCOM' },
    { name: 'Rhushi', roll: '2032', email: 'rhushi@gmail.com', branch: 'BCA' }
  ]);

  const [subjects, setSubjects] = useState([
    { id: 1, code: 'CS101', name: 'Data Structures', credits: 4, branch: 'BCA', academicDays: 200 },
    { id: 2, code: 'CS102', name: 'Algorithms', credits: 4, branch: 'BCA', academicDays: 200 },
    { id: 3, code: 'COM101', name: 'Accounting', credits: 3, branch: 'BCOM', academicDays: 200 }
  ]);

  const [settings, setSettings] = useState({
    academicDaysWithoutSunday: 200
  });

  return (
    <DataContext.Provider
      value={{
        students,
        setStudents,
        subjects,
        setSubjects,
        settings,
        setSettings
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
