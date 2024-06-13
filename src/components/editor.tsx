import React, { useMemo, Suspense } from 'react';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

// Type assertion for the lazy-loaded component
const ReactQuill = React.lazy(() => import('react-quill') as unknown as Promise<{ default: React.ComponentType<any> }>);

const Editor = ({ onChange, value }: EditorProps) => {
  // Memoize the dynamic import if needed
  const MemoizedReactQuill = useMemo(() => ReactQuill, []);

  return (
    <div className="bg-white ql-container">
      <Suspense fallback={<div>Loading editor...</div>}>
        <MemoizedReactQuill theme="snow" value={value} onChange={onChange} />
      </Suspense>
    </div>
  );
};

export default Editor;
