import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const ComplianceChecklist = () => {
  const complianceItems = [
    {
      id: 1,
      category: "FERPA Compliance",
      items: [
        { id: 'ferpa-1', label: "Annual privacy notice distributed to all stakeholders", checked: true },
        { id: 'ferpa-2', label: "Student consent forms collected and archived", checked: true },
        { id: 'ferpa-3', label: "Data access logs reviewed and documented", checked: true },
        { id: 'ferpa-4', label: "Third-party data sharing agreements updated", checked: false }
      ]
    },
    {
      id: 2,
      category: "COPPA Compliance",
      items: [
        { id: 'coppa-1', label: "Parental consent obtained for students under 13", checked: true },
        { id: 'coppa-2', label: "Data collection practices clearly disclosed", checked: true },
        { id: 'coppa-3', label: "Parental access portal functionality verified", checked: false }
      ]
    },
    {
      id: 3,
      category: "Security Standards (SOC 2)",
      items: [
        { id: 'soc-1', label: "Quarterly security audit completed", checked: true },
        { id: 'soc-2', label: "Encryption protocols verified and documented", checked: true },
        { id: 'soc-3', label: "Incident response plan tested and updated", checked: true },
        { id: 'soc-4', label: "Access control policies reviewed", checked: false }
      ]
    },
    {
      id: 4,
      category: "Data Protection",
      items: [
        { id: 'data-1', label: "Automated backup systems operational", checked: true },
        { id: 'data-2', label: "Disaster recovery plan documented", checked: true },
        { id: 'data-3', label: "Data retention policies enforced", checked: true },
        { id: 'data-4', label: "Secure data disposal procedures verified", checked: false }
      ]
    }
  ];

  const calculateProgress = (items) => {
    const completed = items?.filter(item => item?.checked)?.length;
    return Math.round((completed / items?.length) * 100);
  };

  const overallProgress = () => {
    const allItems = complianceItems?.flatMap(cat => cat?.items);
    return calculateProgress(allItems);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">Compliance Checklist</h3>
          <p className="text-sm text-muted-foreground">Track regulatory compliance requirements</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-foreground">{overallProgress()}%</p>
          <p className="text-xs text-muted-foreground">Overall Compliance</p>
        </div>
      </div>
      <div className="space-y-6">
        {complianceItems?.map((category) => {
          const progress = calculateProgress(category?.items);
          return (
            <div key={category?.id} className="border border-border rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-semibold text-foreground">{category?.category}</h4>
                <span className={`text-sm font-medium ${progress === 100 ? 'text-success' : 'text-warning'}`}>
                  {progress}% Complete
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${progress === 100 ? 'bg-success' : 'bg-warning'}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="space-y-3">
                {category?.items?.map((item) => (
                  <div key={item?.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <Checkbox
                      checked={item?.checked}
                      onChange={() => {}}
                      className="mt-0.5"
                    />
                    <label className="text-sm text-foreground cursor-pointer flex-1">
                      {item?.label}
                    </label>
                    {item?.checked && (
                      <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} />
            <span>Last reviewed: December 5, 2025</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium">
            <Icon name="FileText" size={16} />
            Generate Compliance Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceChecklist;