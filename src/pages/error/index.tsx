import { useRouteError } from "react-router";

const Error = () => {
  const err = useRouteError();

  return (
    <>
      <div className="flex flex-col h-screen items-center w-screen mt-5">
        <div>Oops!</div>
        <div>Something went wrong</div>
        <div>
          {err.status}: {err.statusText}
        </div>
      </div>
    </>
  );
};
export default Error;
