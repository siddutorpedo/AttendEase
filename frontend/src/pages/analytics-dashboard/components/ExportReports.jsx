import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportReports = () => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  const formats = [
    { id: 'pdf', label: 'PDF Document', icon: 'FileText', description: 'Formatted report with charts' },
    { id: 'excel', label: 'Excel Spreadsheet', icon: 'FileSpreadsheet', description: 'Raw data for analysis' },
    { id: 'csv', label: 'CSV File', icon: 'FileDown', description: 'Simple data export' },
    { id: 'json', label: 'JSON Data', icon: 'FileJson', description: 'API-ready format' }
  ];

  const handleExport = () => {
    console.log(`Exporting report as ${selectedFormat}`);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Export Reports</h3>
      </div>
      <div className="space-y-3 mb-4">
        {formats?.map((format) => (
          <button
            key={format?.id}
            onClick={() => setSelectedFormat(format?.id)}
            className={`w-full flex items-start gap-3 p-3 rounded-lg border transition-all duration-300 ${
              selectedFormat === format?.id
                ? 'bg-primary/10 border-primary' :'bg-background border-border hover:bg-muted'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selectedFormat === format?.id ? 'bg-primary' : 'bg-muted'
            }`}>
              <Icon 
                name={format?.icon} 
                size={20} 
                color={selectedFormat === format?.id ? '#FFFFFF' : 'currentColor'}
              />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-sm font-medium text-foreground">{format?.label}</h4>
              <p className="text-xs text-muted-foreground">{format?.description}</p>
            </div>
            {selectedFormat === format?.id && (
              <Icon name="CheckCircle2" size={20} className="text-primary" />
            )}
          </button>
        ))}
      </div>
      <Button 
        variant="default" 
        fullWidth 
        iconName="Download" 
        iconPosition="left"
        onClick={handleExport}
      >
        Export as {formats?.find(f => f?.id === selectedFormat)?.label}
      </Button>
    </div>
  );
};

export default ExportReports;