import React, { FC } from "react";

const ErrorMessage: FC<{ error: { state: boolean; message: string } }> = ({ error }) => {
  return error.state ? (
    <span className="absolute bottom-0 left-1/2 z-40 my-4 w-6/12 -translate-x-1/2 animate-pulse rounded bg-red-900/90 p-1 text-center font-mono text-xl font-normal capitalize text-red-300">
      {error.message}{" "}
    </span>
  ) : null;
};

export default ErrorMessage;
