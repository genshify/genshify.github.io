import { characterAsset } from "genshin-optimizer/assets";
import type { CharacterKey } from "genshin-optimizer/consts";
import { useDBMeta } from "genshin-optimizer/db-ui";
import { styled } from "@mui/material";
interface ImgIconProps {
  size?: number;
  sideMargin?: boolean;
}
/**
 * Genshin side icons are not very well cropped, so we have to manually apply margin to get it to look pretty.
 */
const CharIconSideWrapper = styled("img", {
  name: "ImgIcon",
  slot: "Root",
  shouldForwardProp: (pn) =>
    !["size", "sideMargin"].includes(pn as "size" | "sideMargin"),
})<ImgIconProps>(({ size = 3, sideMargin = false }) => ({
  display: "inline-block",
  width: `${size}em`,
  height: `${size}em`,
  marginTop: `${0.85 * (1 - size)}em`,
  marginBottom: `${0.15 * (1 - size)}em`,
  marginLeft: sideMargin ? undefined : `${0.3 * (1 - size)}em`,
  marginRight: sideMargin ? undefined : `${0.3 * (1 - size)}em`,
  verticalAlign: "text-bottom",
}));

/**
 * Silly wisher side icons are just front icons, and they are much more sensibly sized.
 */


export default function CharIconSide({
  characterKey,
  sideMargin = false,
}: {
  characterKey: CharacterKey;
  sideMargin?: boolean;
}) {
  const { gender } = useDBMeta();

  const genshinAsset = characterAsset(characterKey, "iconSide", gender);

  return <CharIconSideWrapper src={genshinAsset} sideMargin={sideMargin} />;
}
