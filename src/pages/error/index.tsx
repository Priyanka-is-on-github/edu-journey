import { useRouteError, isRouteErrorResponse } from "react-router";

const Error = () => {
  const error:any = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col h-screen items-center w-screen mt-5">
        <div>Oops!</div>
        <div>Something went wrong</div>
        <div>
          {error.status}: {error.statusText}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen items-center w-screen mt-5">
      <div>Oops!</div>
      <div>Something went wrong</div>
      <div>{error.message || "Unknown Error"}</div>
    </div>
  );
};

export default Error;
