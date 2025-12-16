import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (message?.trim()) {
      setMessage('');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-card border border-border rounded-lg shadow-elevated z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Icon name="Headphones" size={20} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Support Team</h3>
                <div className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="text-primary-foreground hover:bg-primary-foreground/20 p-1 rounded transition-colors"
              aria-label="Close chat"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-muted/30">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Icon name="Bot" size={16} className="text-primary-foreground" />
                </div>
                <div className="bg-card border border-border rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-foreground">
                    Hello! Welcome to AttendEase Support. How can I help you today?
                  </p>
                  <span className="text-xs text-muted-foreground mt-1 block">Just now</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                variant="default"
                size="icon"
                onClick={handleSendMessage}
                disabled={!message?.trim()}
              >
                <Icon name="Send" size={18} />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Paperclip" size={16} />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Image" size={16} />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Smile" size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-brand hover:shadow-elevated transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
        aria-label="Open live chat"
      >
        {isOpen ? (
          <Icon name="X" size={24} />
        ) : (
          <Icon name="MessageCircle" size={24} />
        )}
      </button>
    </>
  );
};

export default LiveChatWidget;