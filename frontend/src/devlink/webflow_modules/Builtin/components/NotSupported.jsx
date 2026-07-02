"use client";
import * as React from "react";

const NotSupported = React.forwardRef(function NotSupported({ _atom = "" }, ref) {
  return (
    <div ref={ref}>{`This builtin is not currently supported: ${_atom}`}</div>
  );
});

export default NotSupported;
