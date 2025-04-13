import React from 'react';

interface ImageCreditProps {
  credit?: {
    authorName?: string;
    authorUrl?: string;
    sourceName?: string;
    sourceUrl?: string;
  };
  className?: string;
}

export function ImageCredit({ credit, className = '' }: ImageCreditProps) {
  if (!credit) return null;
  
  return (
    <div className={`text-xs text-muted-foreground ${className}`}>
      Photo by{' '}
      <a 
        href={credit.authorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {credit.authorName}
      </a>
      {' '}on{' '}
      <a 
        href={credit.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {credit.sourceName}
      </a>
    </div>
  );
} 