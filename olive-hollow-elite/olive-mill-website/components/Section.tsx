import React from 'react';

const Section: React.FC<{ children: React.ReactNode; className?: string; tone?: 'default' | 'soft' | 'dark' }> = ({
  children,
  className,
  tone = 'default',
}) => {
  const toneClasses =
    tone === 'default'
      ? 'bg-transparent'
      : tone === 'soft'
      ? 'bg-creamBackground'
      : 'bg-olivePrimary text-creamBackground';

  return (
    <section className={`${toneClasses} ${className ?? ''}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">{children}</div>
    </section>
  );
};

export default Section;
