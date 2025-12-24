import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MarkdownRenderer.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`markdown-renderer ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="markdown-h1" {...props} />,
          h2: ({ node, ...props }) => <h2 className="markdown-h2" {...props} />,
          h3: ({ node, ...props }) => <h3 className="markdown-h3" {...props} />,
          h4: ({ node, ...props }) => <h4 className="markdown-h4" {...props} />,
          p: ({ node, ...props }) => <p className="markdown-p" {...props} />,
          ul: ({ node, ...props }) => <ul className="markdown-ul" {...props} />,
          ol: ({ node, ...props }) => <ol className="markdown-ol" {...props} />,
          li: ({ node, ...props }) => <li className="markdown-li" {...props} />,
          code: ({ node, inline, ...props }: any) => {
            return inline ? (
              <code className="markdown-code-inline" {...props} />
            ) : (
              <code className="markdown-code-block" {...props} />
            );
          },
          pre: ({ node, ...props }) => <pre className="markdown-pre" {...props} />,
          a: ({ node, ...props }) => <a className="markdown-a" target="_blank" rel="noopener noreferrer" {...props} />,
          blockquote: ({ node, ...props }) => <blockquote className="markdown-blockquote" {...props} />,
          table: ({ node, ...props }) => <table className="markdown-table" {...props} />,
          thead: ({ node, ...props }) => <thead className="markdown-thead" {...props} />,
          tbody: ({ node, ...props }) => <tbody className="markdown-tbody" {...props} />,
          tr: ({ node, ...props }) => <tr className="markdown-tr" {...props} />,
          th: ({ node, ...props }) => <th className="markdown-th" {...props} />,
          td: ({ node, ...props }) => <td className="markdown-td" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};


