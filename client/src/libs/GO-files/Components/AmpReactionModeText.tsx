import { iconInlineProps } from "genshin-optimizer/svgicons";
import type { AmpReactionKey } from "genshin-optimizer/consts";
import { Box } from "@mui/material";
import { ElementIcon } from "../KeyMap/StatIcon";
import { ColorText } from "genshin-optimizer/ui";
import { SqBadge } from "genshin-optimizer/ui";

export const ampReactionMap = {
  melt: {
    cryo: "pyro",
    pyro: "cryo",
  },
  vaporize: {
    hydro: "pyro",
    pyro: "hydro",
  },
} as const;
const sqBadgeStyle = { mx: 0.25, px: 0.25 };
export default function AmpReactionModeText({
  reaction,
  trigger,
}: {
  reaction: AmpReactionKey;
  trigger?: "cryo" | "pyro" | "hydro";
}) {
  const base = ampReactionMap[reaction][
    trigger as keyof (typeof ampReactionMap)[typeof reaction]
  ] as "cryo" | "pyro" | "hydro" | undefined;
  if (!base) return null;

  return (
    <Box display="flex" alignItems="center">
      <ColorText color="melt">{`reaction.${reaction}`}</ColorText>
      <SqBadge sx={sqBadgeStyle} color={base}>
        {<ElementIcon ele={base} iconProps={iconInlineProps} />}
      </SqBadge>
      {`+`}
      <SqBadge sx={sqBadgeStyle} color={trigger as "cryo" | "pyro" | "hydro"}>
        {
          <ElementIcon
            ele={trigger as "cryo" | "pyro" | "hydro"}
            iconProps={iconInlineProps}
          />
        }
      </SqBadge>
    </Box>
  );
}
