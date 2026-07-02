"use client";

import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import Link from "./webflow_modules/Basic/components/Link";
import { RomsLogo } from "./RomsLogo";

export function TimelineColumn({
  link1 = { href: "/" },
  link2 = { href: "/" },
  link3 = { href: "/motion-design" },
  link4 = { href: "/game-experiments" },
  romsLogoTitle = "ROMAIN VERNIER",
  text1 = "Journal",
  text2 = "Motion Design",
  text3 = "Game Experiments",
}) {
  return (
    <div className={DEVLINK_SCOPE_CLASS} style={{ display: "contents" }}>
      <Block className={"timeline_column"} tag={"div"}>
        <Link block={"inline"} button={false} className={"link-block"} options={link1}>
          <RomsLogo title={romsLogoTitle} />
        </Link>
        <Block className={"links_container"} tag={"div"}>
          <Block className={"link_div"} tag={"div"}>
            <Block className={"white_block"} tag={"div"} />
            <Link button={false} className={"link"} options={link2}>{text1}</Link>
          </Block>
          <Block className={"link_div"} tag={"div"}>
            <Block className={"white_block"} tag={"div"} />
            <Link button={false} className={"link"} options={link3}>{text2}</Link>
          </Block>
          <Block className={"link_div"} tag={"div"}>
            <Block className={"white_block"} tag={"div"} />
            <Link button={false} className={"link"} options={link4}>{text3}</Link>
          </Block>
        </Block>
      </Block>
    </div>
  );
}
