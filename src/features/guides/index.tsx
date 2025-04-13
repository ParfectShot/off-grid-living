import React from 'react';

interface ImageCreditProps {
  credit: {
    authorName: string;
    authorUrl?: string;
    sourceName: string;
    sourceUrl?: string;
  };
  className?: string;
}

export function ImageCredit({ credit, className = "" }: ImageCreditProps) {
  return (
    <p className={`text-xs ${className}`}>
      Photo by{" "}
      {credit.authorUrl ? (
        <a
          href={credit.authorUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          {credit.authorName}
        </a>
      ) : (
        <span>{credit.authorName}</span>
      )}{" "}
      on{" "}
      {credit.sourceUrl ? (
        <a
          href={credit.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          {credit.sourceName}
        </a>
      ) : (
        <span>{credit.sourceName}</span>
      )}
    </p>
  );
} 