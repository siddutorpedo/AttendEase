import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex gap-3">
      <div className="flex-1">
        <Input
          type="search"
          placeholder="Search by name, roll number, or ID..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;