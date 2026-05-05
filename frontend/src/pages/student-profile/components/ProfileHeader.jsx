import React, { useState, useRef } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ student, onEdit, onProfilePhotoUpdate }) => {
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef(null);

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-error';
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploadingPhoto(true);

    // Read file as data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result;
      if (imageData && onProfilePhotoUpdate) {
        onProfilePhotoUpdate(imageData);
      }
      setIsUploadingPhoto(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-card rounded-xl shadow-soft border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="relative group">
            <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-primary/20">
              <Image
                src={student?.profileImage}
                alt={student?.profileImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Upload overlay */}
            <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto}
                className="p-2 bg-primary rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
                title="Upload profile photo"
              >
                <Icon name="Camera" size={20} className="text-primary-foreground" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              disabled={isUploadingPhoto}
            />
            <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground rounded-full p-2 shadow-elevated">
              <Icon name="CheckCircle" size={20} />
            </div>
          </div>
          {isUploadingPhoto && (
            <p className="text-xs text-muted-foreground mt-2 text-center">Uploading...</p>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{student?.name}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Hash" size={16} />
                  {student?.studentId}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="GraduationCap" size={16} />
                  {student?.grade} - {student?.section}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={16} />
                  Enrolled: {student?.enrollmentDate}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="TrendingUp" size={18} className="text-primary" />
                <span className="text-xs font-medium text-muted-foreground uppercase">Attendance Rate</span>
              </div>
              <p className={`text-2xl font-bold ${getAttendanceColor(student?.attendanceRate)}`}>
                {student?.attendanceRate}%
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Calendar" size={18} className="text-secondary" />
                <span className="text-xs font-medium text-muted-foreground uppercase">Days Present</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{student?.daysPresent}</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="XCircle" size={18} className="text-error" />
                <span className="text-xs font-medium text-muted-foreground uppercase">Days Absent</span>
              </div>
              <p className="text-2xl font-bold text-error">{student?.daysAbsent}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;