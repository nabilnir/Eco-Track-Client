import React from "react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-16 h-16">
        
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 border-r-green-500 animate-spin" />
        
        
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-green-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}