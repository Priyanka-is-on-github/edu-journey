

const Shimmer = ({ width = 'w-full', height = 'h-48' }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded-lg m-5  ${width} ${height}`}
  />
);

export default Shimmer;
