import React from 'react';

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <section className={`max-w-7xl mx-auto px-4 py-16 ${className ?? ''}`}>
      {children}
    </section>
  );
};

export default Section;