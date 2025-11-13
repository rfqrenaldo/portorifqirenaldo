import React, { useState } from 'react';

const TechStackIcon = ({ TechStackIcon, Language }) => {
  const [imageError, setImageError] = useState(false);

  // Fallback icon component untuk teknologi yang tidak memiliki icon
  const FallbackIcon = () => (
    <div className="relative h-16 w-16 md:h-20 md:w-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-purple-500/30 group-hover:border-purple-400/50 transition-colors duration-300">
      <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        {Language.charAt(0).toUpperCase()}
      </span>
    </div>
  );

  return (
    <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 blur transition duration-300"></div>
        
        {imageError ? (
          <FallbackIcon />
        ) : (
          <img 
            src={TechStackIcon} 
            alt={`${Language} icon`} 
            className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300 filter group-hover:brightness-110"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <span className="text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300 text-center">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon; 