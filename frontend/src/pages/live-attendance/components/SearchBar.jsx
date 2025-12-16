import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const SearchBar = ({ searchQuery, onSearchChange, onScanQR }) => {
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
      <Button variant="outline" iconName="QrCode" onClick={onScanQR}>
        Scan QR
      </Button>
    </div>
  );
};

export default SearchBar;