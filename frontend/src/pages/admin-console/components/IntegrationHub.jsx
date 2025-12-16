import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const IntegrationHub = () => {
  const integrations = [
  {
    id: 1,
    name: "Google Classroom",
    description: "Sync attendance data with Google Classroom rosters and assignments",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1eb853fa3-1764671788850.png",
    logoAlt: "Google Classroom logo featuring colorful letter G with green chalkboard icon on white background",
    status: "Connected",
    lastSync: "2025-12-11 04:30 AM",
    category: "LMS"
  },
  {
    id: 2,
    name: "PowerSchool SIS",
    description: "Bidirectional sync with student information system for enrollment data",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15cb0303c-1764656703640.png",
    logoAlt: "Modern education technology platform logo with blue and white color scheme representing student information system",
    status: "Connected",
    lastSync: "2025-12-11 05:00 AM",
    category: "SIS"
  },
  {
    id: 3,
    name: "Microsoft Teams",
    description: "Send attendance notifications and alerts through Teams channels",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_14438b95a-1764781387462.png",
    logoAlt: "Microsoft Teams logo showing purple communication icon with white background representing collaboration platform",
    status: "Connected",
    lastSync: "2025-12-11 03:45 AM",
    category: "Communication"
  },
  {
    id: 4,
    name: "Canvas LMS",
    description: "Integrate attendance tracking with Canvas course management",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_16c99db0e-1764671792706.png",
    logoAlt: "Canvas learning management system logo with orange and white design representing online education platform",
    status: "Available",
    lastSync: null,
    category: "LMS"
  },
  {
    id: 5,
    name: "Slack",
    description: "Real-time attendance alerts and notifications via Slack workspace",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c7a04095-1764648544504.png",
    logoAlt: "Slack logo featuring colorful hashtag symbol with red yellow green and blue colors on white background",
    status: "Available",
    lastSync: null,
    category: "Communication"
  },
  {
    id: 6,
    name: "Zoom",
    description: "Automatic attendance tracking for virtual classes and meetings",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd36a7cb-1764668060496.png",
    logoAlt: "Zoom video conferencing logo with blue camera icon representing virtual meeting platform",
    status: "Available",
    lastSync: null,
    category: "Video"
  }];


  const getStatusBadge = (status) => {
    return status === 'Connected' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">Integration Hub</h3>
          <p className="text-sm text-muted-foreground">Connect with third-party platforms and services</p>
        </div>
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Browse Integrations
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations?.map((integration) =>
        <div
          key={integration?.id}
          className="border border-border rounded-lg p-5 hover:shadow-soft transition-all duration-300">

            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                <Image
                src={integration?.logo}
                alt={integration?.logoAlt}
                className="w-full h-full object-cover" />

              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(integration?.status)}`}>
                {integration?.status}
              </span>
            </div>

            <h4 className="text-base font-semibold text-foreground mb-2">{integration?.name}</h4>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{integration?.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-1.5">
                <Icon name="Tag" size={14} color="var(--color-muted-foreground)" />
                <span className="text-xs text-muted-foreground">{integration?.category}</span>
              </div>
              {integration?.status === 'Connected' ?
            <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors duration-200">
                  Configure
                </button> :

            <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors duration-200">
                  Connect
                </button>
            }
            </div>

            {integration?.lastSync &&
          <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon name="RefreshCw" size={12} />
                  <span>Last sync: {integration?.lastSync}</span>
                </div>
              </div>
          }
          </div>
        )}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>All integrations use secure OAuth 2.0 authentication</span>
        </div>
      </div>
    </div>);

};

export default IntegrationHub;