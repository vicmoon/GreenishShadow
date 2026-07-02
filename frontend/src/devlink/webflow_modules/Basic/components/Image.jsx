"use client";
import * as React from "react";
import { DevLinkContext } from "../../../DevLinkProvider";

const Image = React.forwardRef(function Image({ alt, ...props }, ref) {
  const { renderImage: UserImage } = React.useContext(DevLinkContext);
  return UserImage ? (
    <UserImage alt={alt || ""} {...props} ref={ref} />
  ) : (
    <img alt={alt || ""} {...props} ref={ref} />
  );
});

export default Image;
