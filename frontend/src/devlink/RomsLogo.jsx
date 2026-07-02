"use client";

import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Heading from "./webflow_modules/Basic/components/Heading";

export function RomsLogo({ title = "ROMAIN VERNIER", variant = "Base" }) {
  return (
    <div className={DEVLINK_SCOPE_CLASS} style={{ display: "contents" }}>
      <Heading tag={"h2"}>{title}</Heading>
    </div>
  );
}
