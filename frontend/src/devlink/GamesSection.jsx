"use client";

import { DEVLINK_SCOPE_CLASS } from "./devlinkScope";
import Block from "./webflow_modules/Basic/components/Block";
import BlockContainer from "./webflow_modules/Layout/components/BlockContainer";
import Image from "./webflow_modules/Basic/components/Image";
import Link from "./webflow_modules/Basic/components/Link";
import NotSupported from "./webflow_modules/Builtin/components/NotSupported";
import Section from "./webflow_modules/Layout/components/Section";
import { Timeline } from "./Timeline";

export function GamesSection({
  timelineImage = "https://cdn.prod.website-files.com/6a20705338991aef69036547/6a398b9960766fd43cfa464a_logo.png",
  timelineLink1 = { href: "/" },
  timelineLink2 = { href: "/" },
  timelineLink3 = { href: "/motion-design" },
  timelineLink4 = { href: "/game-experiments" },
  timelineText1 = "Journal",
  timelineText2 = "Motion Design",
  timelineText3 = "Game Experiments",
}) {
  return (
    <div className={DEVLINK_SCOPE_CLASS} style={{ display: "contents" }}>
      <Section className={"section"} grid={{ type: "section" }} tag={"section"}>
        <BlockContainer className={"page_wrapper"} grid={{ type: "container" }} tag={"div"}>
          <Timeline
            image={timelineImage}
            link1={timelineLink1}
            link2={timelineLink2}
            link3={timelineLink3}
            link4={timelineLink4}
            text1={timelineText1}
            text2={timelineText2}
            text3={timelineText3}
          />
          <Block className={"div-block-5"} tag={"div"}>
            <Block className={"container_white_line"} tag={"div"} />
            <NotSupported _atom={"Collection List"} />
          </Block>
        </BlockContainer>
      </Section>
    </div>
  );
}
