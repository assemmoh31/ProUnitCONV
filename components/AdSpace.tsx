import React from 'react';
import { AdProps } from '../types.ts';

export const AdSpace: React.FC<AdProps> = ({ slot, className = '' }) => {
  const getSize = () => {
    switch (slot) {
      case 'header': return 'h-24 w-full';
      case 'sidebar': return 'h-64 w-full';
      case 'inline': return 'h-32 w-full';
      default: return 'h-24 w-full';
    }
  };

  return (
    <div className={`bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center relative overflow-hidden group ${getSize()} ${className}`}>
      <div className="absolute inset-0 bg-gray-100 opacity-50 group-hover:opacity-40 transition-opacity" />
      <div className="z-10 text-center">
        <span className="text-gray-500 font-bold tracking-widest uppercase text-xs block mb-1">Advertisement</span>
        <span className="text-gray-400 text-xs">Space Available</span>
      </div>
    </div>
  );
};