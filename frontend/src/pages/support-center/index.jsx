import React, { useState } from 'react';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import Sidebar from '../../components/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import CategoryCard from './components/CategoryCard';
import VideoTutorialCard from './components/VideoTutorialCard';
import ArticleCard from './components/ArticleCard';
import ForumTopicCard from './components/ForumTopicCard';
import LiveChatWidget from './components/LiveChatWidget';
import TicketCard from './components/TicketCard';
import ResourceCard from './components/ResourceCard';
import CertificationCard from './components/CertificationCard';
import QuickActionCard from './components/QuickActionCard';

const SupportCenterContent = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const [activeTab, setActiveTab] = useState('knowledge-base');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
  {
    id: 1,
    icon: "BookOpen",
    title: "Getting Started",
    description: "Learn the basics of AttendEase and set up your account for optimal performance",
    articleCount: 24
  },
  {
    id: 2,
    icon: "Users",
    title: "Attendance Management",
    description: "Master attendance tracking, bulk operations, and smart scheduling features",
    articleCount: 38
  },
  {
    id: 3,
    icon: "BarChart3",
    title: "Analytics & Reports",
    description: "Generate insights, create custom reports, and understand attendance patterns",
    articleCount: 19
  },
  {
    id: 4,
    icon: "Settings",
    title: "System Configuration",
    description: "Configure institutional settings, user permissions, and integration options",
    articleCount: 31
  },
  {
    id: 5,
    icon: "Shield",
    title: "Security & Compliance",
    description: "Understand data privacy, FERPA compliance, and security best practices",
    articleCount: 15
  },
  {
    id: 6,
    icon: "Smartphone",
    title: "Mobile App Guide",
    description: "Use AttendEase on-the-go with our mobile application features and tips",
    articleCount: 22
  }];


  const videoTutorials = [
  {
    id: 1,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1a46e2890-1764674887443.png",
    thumbnailAlt: "Professional educator demonstrating attendance system on laptop in modern classroom with students visible in background",
    title: "Quick Start Guide: Setting Up Your First Class",
    duration: "8:45",
    views: "12.5K",
    category: "Getting Started"
  },
  {
    id: 2,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1478bcc45-1764651525877.png",
    thumbnailAlt: "Business team collaborating around conference table with laptops and documents discussing attendance analytics",
    title: "Advanced Analytics: Understanding Attendance Patterns",
    duration: "12:30",
    views: "8.2K",
    category: "Analytics"
  },
  {
    id: 3,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_14a02e326-1764670076150.png",
    thumbnailAlt: "Young female student using smartphone in library with books and laptop showing mobile attendance interface",
    title: "Mobile Attendance: Mark Attendance Anywhere",
    duration: "6:15",
    views: "15.8K",
    category: "Mobile App"
  },
  {
    id: 4,
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_173ed3368-1764661380993.png",
    thumbnailAlt: "Administrator working on desktop computer with multiple screens showing system configuration dashboard",
    title: "System Administration: User Roles & Permissions",
    duration: "10:20",
    views: "6.4K",
    category: "Administration"
  }];


  const articles = [
  {
    id: 1,
    title: "How to Import Student Data from Excel",
    excerpt: "Step-by-step guide to bulk import student information using CSV or Excel files with proper formatting and validation",
    category: "Data Management",
    readTime: 5,
    helpful: 234
  },
  {
    id: 2,
    title: "Understanding Attendance Percentage Calculations",
    excerpt: "Learn how AttendEase calculates attendance percentages, handles partial attendance, and generates accurate reports",
    category: "Analytics",
    readTime: 7,
    helpful: 189
  },
  {
    id: 3,
    title: "Setting Up Automated Parent Notifications",
    excerpt: "Configure email and SMS alerts for parents when students are absent or late with customizable templates",
    category: "Communication",
    readTime: 6,
    helpful: 312
  },
  {
    id: 4,
    title: "Best Practices for Attendance Policy Configuration",
    excerpt: "Implement effective attendance policies that align with institutional requirements and educational standards",
    category: "Configuration",
    readTime: 8,
    helpful: 156
  }];


  const forumTopics = [
  {
    id: 1,
    title: "How to handle attendance for hybrid classes?",
    author: "Sarah Mitchell",
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17784c577-1763297418164.png",
    authorAvatarAlt: "Professional headshot of Caucasian woman with shoulder-length brown hair wearing navy blazer",
    replies: 12,
    views: 234,
    lastActivity: "2 hours ago",
    category: "Attendance Management",
    solved: true
  },
  {
    id: 2,
    title: "Integration with Google Classroom - Best approach?",
    author: "Michael Chen",
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ffeb43ad-1763298672388.png",
    authorAvatarAlt: "Professional headshot of Asian man with short black hair wearing white shirt and glasses",
    replies: 8,
    views: 156,
    lastActivity: "5 hours ago",
    category: "Integrations",
    solved: false
  },
  {
    id: 3,
    title: "Custom report templates for monthly attendance",
    author: "Emily Rodriguez",
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a587b058-1763294420326.png",
    authorAvatarAlt: "Professional headshot of Hispanic woman with long dark hair wearing red blouse",
    replies: 15,
    views: 389,
    lastActivity: "1 day ago",
    category: "Reports",
    solved: true
  },
  {
    id: 4,
    title: "Mobile app offline mode - data sync issues",
    author: "David Thompson",
    authorAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1a184de25-1763292715446.png",
    authorAvatarAlt: "Professional headshot of African American man with short hair wearing gray suit",
    replies: 6,
    views: 98,
    lastActivity: "3 hours ago",
    category: "Mobile App",
    solved: false
  }];


  const tickets = [
  {
    ticketId: "ATD-2847",
    subject: "Unable to export attendance report for December",
    status: "In Progress",
    priority: "High",
    createdDate: "Dec 09, 2025",
    lastUpdate: "2 hours ago",
    category: "Reports"
  },
  {
    ticketId: "ATD-2846",
    subject: "Student profile not updating after data import",
    status: "Open",
    priority: "Medium",
    createdDate: "Dec 08, 2025",
    lastUpdate: "1 day ago",
    category: "Data Management"
  },
  {
    ticketId: "ATD-2845",
    subject: "Email notifications not being sent to parents",
    status: "Resolved",
    priority: "High",
    createdDate: "Dec 07, 2025",
    lastUpdate: "2 days ago",
    category: "Communication"
  }];


  const resources = [
  {
    id: 1,
    icon: "FileText",
    title: "Attendance Policy Template",
    description: "Comprehensive template for creating institutional attendance policies with best practices",
    fileType: "PDF",
    fileSize: "2.4 MB",
    downloads: 1847
  },
  {
    id: 2,
    icon: "Table",
    title: "Student Data Import Template",
    description: "Excel template with proper formatting for bulk student data import",
    fileType: "XLSX",
    fileSize: "156 KB",
    downloads: 3421
  },
  {
    id: 3,
    icon: "FileSpreadsheet",
    title: "Monthly Report Template",
    description: "Customizable monthly attendance report template for institutional reporting",
    fileType: "XLSX",
    fileSize: "892 KB",
    downloads: 2156
  },
  {
    id: 4,
    icon: "BookOpen",
    title: "Implementation Checklist",
    description: "Step-by-step checklist for successful AttendEase implementation",
    fileType: "PDF",
    fileSize: "1.8 MB",
    downloads: 987
  }];


  const certifications = [
  {
    id: 1,
    badge: "https://img.rocket.new/generatedImages/rocket_gen_img_1b2a84385-1764822049049.png",
    badgeAlt: "Gold certification badge with graduation cap icon and star emblem on blue background",
    title: "AttendEase Certified Administrator",
    description: "Master system administration, user management, and advanced configuration",
    level: "Advanced",
    duration: "8 hours",
    enrolled: 234,
    progress: 65
  },
  {
    id: 2,
    badge: "https://img.rocket.new/generatedImages/rocket_gen_img_1fca3742e-1765277926678.png",
    badgeAlt: "Silver certification badge with analytics chart icon and checkmark on green background",
    title: "Analytics & Reporting Specialist",
    description: "Learn to create powerful reports and derive actionable insights from attendance data",
    level: "Intermediate",
    duration: "6 hours",
    enrolled: 412
  },
  {
    id: 3,
    badge: "https://img.rocket.new/generatedImages/rocket_gen_img_1a1333ca3-1764768613830.png",
    badgeAlt: "Bronze certification badge with mobile phone icon and ribbon on orange background",
    title: "Mobile Attendance Expert",
    description: "Become proficient in mobile attendance tracking and on-the-go management",
    level: "Beginner",
    duration: "4 hours",
    enrolled: 678,
    progress: 30
  }];


  const quickActions = [
  {
    id: 1,
    icon: "LifeBuoy",
    title: "Submit a Support Ticket",
    description: "Get help from our support team for technical issues"
  },
  {
    id: 2,
    icon: "Calendar",
    title: "Schedule a Demo",
    description: "Book a personalized demo with our product experts"
  },
  {
    id: 3,
    icon: "Video",
    title: "Join Live Webinar",
    description: "Attend our weekly training sessions and Q&A"
  },
  {
    id: 4,
    icon: "MessageSquare",
    title: "Community Forums",
    description: "Connect with other users and share experiences"
  }];


  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const tabs = [
  { id: 'knowledge-base', label: 'Knowledge Base', icon: 'BookOpen' },
  { id: 'video-tutorials', label: 'Video Tutorials', icon: 'Video' },
  { id: 'community', label: 'Community', icon: 'Users' },
  { id: 'my-tickets', label: 'My Tickets', icon: 'Ticket' },
  { id: 'resources', label: 'Resources', icon: 'Download' },
  { id: 'certifications', label: 'Certifications', icon: 'Award' }];


  return (
    <>
      <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      <main className={`main-content ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background border-b border-border">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  How can we help you today?
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Search our knowledge base, watch tutorials, or connect with our community
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <SearchBar onSearch={handleSearch} />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions?.map((action) =>
              <QuickActionCard
                key={action?.id}
                icon={action?.icon}
                title={action?.title}
                description={action?.description}
                onClick={() => {}} />

              )}
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-border bg-card sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-1 overflow-x-auto">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab?.id ?
                  'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`
                  }>

                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Knowledge Base Tab */}
            {activeTab === 'knowledge-base' &&
            <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Browse by Category</h2>
                    <Button variant="outline" iconName="Grid" iconPosition="left">
                      View All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories?.map((category) =>
                  <CategoryCard
                    key={category?.id}
                    icon={category?.icon}
                    title={category?.title}
                    description={category?.description}
                    articleCount={category?.articleCount}
                    onClick={() => {}} />

                  )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Popular Articles</h2>
                    <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
                      See All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {articles?.map((article) =>
                  <ArticleCard
                    key={article?.id}
                    title={article?.title}
                    excerpt={article?.excerpt}
                    category={article?.category}
                    readTime={article?.readTime}
                    helpful={article?.helpful}
                    onClick={() => {}} />

                  )}
                  </div>
                </div>
              </div>
            }

            {/* Video Tutorials Tab */}
            {activeTab === 'video-tutorials' &&
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Video Tutorials</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" iconName="Filter">
                      Filter
                    </Button>
                    <Button variant="outline" iconName="SlidersHorizontal">
                      Sort
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videoTutorials?.map((video) =>
                <VideoTutorialCard
                  key={video?.id}
                  thumbnail={video?.thumbnail}
                  thumbnailAlt={video?.thumbnailAlt}
                  title={video?.title}
                  duration={video?.duration}
                  views={video?.views}
                  category={video?.category}
                  onClick={() => {}} />

                )}
                </div>
              </div>
            }

            {/* Community Tab */}
            {activeTab === 'community' &&
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Community Forums</h2>
                  <Button variant="default" iconName="Plus" iconPosition="left">
                    New Topic
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {forumTopics?.map((topic) =>
                <ForumTopicCard
                  key={topic?.id}
                  title={topic?.title}
                  author={topic?.author}
                  authorAvatar={topic?.authorAvatar}
                  authorAvatarAlt={topic?.authorAvatarAlt}
                  replies={topic?.replies}
                  views={topic?.views}
                  lastActivity={topic?.lastActivity}
                  category={topic?.category}
                  solved={topic?.solved}
                  onClick={() => {}} />

                )}
                </div>
              </div>
            }

            {/* My Tickets Tab */}
            {activeTab === 'my-tickets' &&
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">My Support Tickets</h2>
                  <Button variant="default" iconName="Plus" iconPosition="left">
                    New Ticket
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tickets?.map((ticket) =>
                <TicketCard
                  key={ticket?.ticketId}
                  ticketId={ticket?.ticketId}
                  subject={ticket?.subject}
                  status={ticket?.status}
                  priority={ticket?.priority}
                  createdDate={ticket?.createdDate}
                  lastUpdate={ticket?.lastUpdate}
                  category={ticket?.category} />

                )}
                </div>
              </div>
            }

            {/* Resources Tab */}
            {activeTab === 'resources' &&
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Downloadable Resources</h2>
                  <Button variant="outline" iconName="Filter">
                    Filter by Type
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources?.map((resource) =>
                <ResourceCard
                  key={resource?.id}
                  icon={resource?.icon}
                  title={resource?.title}
                  description={resource?.description}
                  fileType={resource?.fileType}
                  fileSize={resource?.fileSize}
                  downloads={resource?.downloads}
                  onDownload={() => {}} />

                )}
                </div>
              </div>
            }

            {/* Certifications Tab */}
            {activeTab === 'certifications' &&
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Certification Programs</h2>
                  <Button variant="outline" iconName="Award">
                    My Certificates
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certifications?.map((cert) =>
                <CertificationCard
                  key={cert?.id}
                  badge={cert?.badge}
                  badgeAlt={cert?.badgeAlt}
                  title={cert?.title}
                  description={cert?.description}
                  level={cert?.level}
                  duration={cert?.duration}
                  enrolled={cert?.enrolled}
                  progress={cert?.progress}
                  onEnroll={() => {}}
                  onContinue={() => {}} />

                )}
                </div>
              </div>
            }
          </div>

          {/* Contact Support Section */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Still need help?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our support team is available 24/7 to assist you with any questions
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    support@attendease.com
                  </p>
                  <Button variant="outline" size="sm">
                    Send Email
                  </Button>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Phone" size={24} className="text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    +1 (800) 123-4567
                  </p>
                  <Button variant="outline" size="sm">
                    Call Now
                  </Button>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="MessageCircle" size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Average response: 2 min
                  </p>
                  <Button variant="outline" size="sm">
                    Start Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat Widget */}
        <LiveChatWidget />
      </main>
    </>);

};

const SupportCenter = () => {
  return (
    <SidebarProvider>
      <SupportCenterContent />
    </SidebarProvider>);

};

export default SupportCenter;