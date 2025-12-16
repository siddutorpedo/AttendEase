import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = ({ weather }) => {
  const getWeatherIcon = (condition) => {
    const icons = {
      sunny: 'Sun',
      cloudy: 'Cloud',
      rainy: 'CloudRain',
      stormy: 'CloudLightning',
      snowy: 'CloudSnow',
      windy: 'Wind'
    };
    return icons?.[condition] || 'Cloud';
  };

  const getWeatherGradient = (condition) => {
    const gradients = {
      sunny: 'from-yellow-400 to-orange-500',
      cloudy: 'from-gray-400 to-gray-600',
      rainy: 'from-blue-400 to-blue-600',
      stormy: 'from-purple-500 to-gray-700',
      snowy: 'from-blue-200 to-blue-400',
      windy: 'from-teal-400 to-cyan-500'
    };
    return gradients?.[condition] || gradients?.cloudy;
  };

  return (
    <div className={`bg-gradient-to-br ${getWeatherGradient(weather?.condition)} rounded-lg p-6 text-white shadow-elevated`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm opacity-90 mb-1">{weather?.location}</p>
          <p className="text-xs opacity-75">{new Date()?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>
        <Icon name={getWeatherIcon(weather?.condition)} size={32} color="#FFFFFF" />
      </div>
      <div className="flex items-end gap-2 mb-4">
        <span className="text-5xl font-bold">{weather?.temperature}°</span>
        <span className="text-xl opacity-75 mb-2">C</span>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-white/20">
        <div className="flex items-center gap-2">
          <Icon name="Droplets" size={16} color="#FFFFFF" />
          <span className="text-sm">{weather?.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Wind" size={16} color="#FFFFFF" />
          <span className="text-sm">{weather?.windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Eye" size={16} color="#FFFFFF" />
          <span className="text-sm">{weather?.visibility} km</span>
        </div>
      </div>
      <p className="text-sm mt-4 opacity-90 capitalize">{weather?.description}</p>
    </div>
  );
};

export default WeatherWidget;