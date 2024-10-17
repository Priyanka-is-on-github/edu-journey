import React, { useMemo, Suspense } from "react";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

// Type assertion for the lazy-loaded component
const ReactQuill = React.lazy(
  () =>
    import("react-quill") as unknown as Promise<{
      default: React.ComponentType<any>;
    }>
);

const Preview = ({ value }: PreviewProps) => {
  // Memoize the dynamic import if needed

  const MemoizedReactQuill = useMemo(() => ReactQuill, []);

  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <MemoizedReactQuill theme="bubble" value={value} readOnly />
    </Suspense>
  );
};

export default Preview;
