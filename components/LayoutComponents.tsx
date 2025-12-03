import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children, className = "", icon, action }) => {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg flex flex-col ${className}`}>
      <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {icon && <span className="text-indigo-400">{icon}</span>}
          <h2 className="text-lg font-bold text-slate-100">{title}</h2>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-5 flex-grow text-slate-300">
        {children}
      </div>
    </div>
  );
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }> = ({ 
  children, 
  variant = 'primary', 
  className = "", 
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:shadow-indigo-500/20 active:scale-95",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 active:scale-95",
    ghost: "bg-transparent hover:bg-slate-700/50 text-slate-400 hover:text-slate-200"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-2 mb-4 h-full">
      <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">{label}</label>
      <textarea 
        className={`w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none ${className}`}
        {...props}
      />
    </div>
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-medium text-slate-400 uppercase tracking-wider">{label}</label>
      <input 
        className={`w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all ${className}`}
        {...props}
      />
    </div>
  );
};