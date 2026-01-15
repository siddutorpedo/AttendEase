import React from 'react';
import Icon from '../../components/AppIcon';

const SupportCenter = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Icon name="HelpCircle" size={32} className="text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Support Center</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Help Articles */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Help Articles</h2>
            <div className="space-y-4">
              {['Getting Started', 'User Management', 'System Configuration', 'Troubleshooting'].map((article, i) => (
                <div key={i} className="flex items-start gap-4 p-4 hover:bg-muted rounded-lg cursor-pointer transition">
                  <Icon name="FileText" size={20} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">{article}</h3>
                    <p className="text-sm text-muted-foreground">Learn about {article.toLowerCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Quick Links</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg text-left text-sm font-medium text-foreground transition">
                <Icon name="MessageCircle" size={18} />
                Live Chat
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg text-left text-sm font-medium text-foreground transition">
                <Icon name="Mail" size={18} />
                Email Support
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg text-left text-sm font-medium text-foreground transition">
                <Icon name="FileText" size={18} />
                Documentation
              </button>
              <button className="w-full flex items-center gap-3 p-3 hover:bg-muted rounded-lg text-left text-sm font-medium text-foreground transition">
                <Icon name="AlertCircle" size={18} />
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
