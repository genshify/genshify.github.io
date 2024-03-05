/* eslint-disable @typescript-eslint/no-explicit-any */
import { imgAssets } from "genshin-optimizer/assets";
import { charCard } from "genshin-optimizer/char-cards";
import type { AscensionKey, CharacterKey } from "genshin-optimizer/consts";
import { allArtifactSlotKeys } from "genshin-optimizer/consts";
import { useCharMeta, useDBMeta, useDatabase } from "genshin-optimizer/db-ui";
import { getLevelString } from "genshin-optimizer/util";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Badge,
  Box,
  CardActionArea,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArtifactCardNano from "../../../../../../libs/GO-files/Components/Artifact/ArtifactCardNano";
import CardLight from "../../../../../../libs/GO-files/Components/Card/CardLight";
import CharacterCardPico, {
  BlankCharacterCardPico,
} from "../../../../../../libs/GO-files/Components/Character/CharacterCardPico";
import StatDisplayComponent from "../../../../../../libs/GO-files/Components/Character/StatDisplayComponent";
import ImgIcon from "../../../../../../libs/GO-files/Components/Image/ImgIcon";
import { SqBadge } from "genshin-optimizer/ui";
import { StarsDisplay } from "genshin-optimizer/ui";
import WeaponCardNano from "../../../../../../libs/GO-files/Components/Weapon/WeaponCardNano";
import { CharacterContext } from "../../../../../../contexts/CharacterContext";
import { DataContext } from "../../../../../../contexts/DataContext";
import type { TalentSheetElementKey } from "../../../../../../libs/GO-files/Data/Characters/ICharacterSheet";
import { uiInput as input } from "../../../../../../libs/GO-files/Formula";
import { ElementIcon } from "../../../../../../libs/GO-files/KeyMap/StatIcon";
import useCharacterReducer from "../../../../../../libs/GO-files/ReactHooks/useCharacterReducer";
import { range } from "../../../../../../libs/GO-files/Util/Util";
import EquipmentSection from "./EquipmentSection";

export default function TabOverview() {
  const scrollRef = useRef<HTMLDivElement>();
  const onScroll = useCallback(
    () => scrollRef?.current?.scrollIntoView?.({ behavior: "smooth" }),
    [scrollRef]
  );

  return (
    <Stack spacing={1}>
      <Box>
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
          <Grid item xs={8} sm={5} md={4} lg={2.3}>
            <CharacterProfileCard />
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={8}
            lg={9.7}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            <EquipmentRow onClick={onScroll} />
            <CardLight sx={{ flexGrow: 1, p: 1 }}>
              <StatDisplayComponent />
            </CardLight>
          </Grid>
        </Grid>
      </Box>
      <Box ref={scrollRef}>
        <EquipmentSection />
      </Box>
    </Stack>
  );
}
function EquipmentRow({ onClick }: { onClick: () => void }) {
  const {
    character: { equippedWeapon },
  } = useContext(CharacterContext);
  const { data } = useContext(DataContext);

  return (
    <Grid container spacing={1} columns={{ xs: 2, sm: 2, md: 3, lg: 6, xl: 6 }}>
      <Grid item xs={1}>
        <WeaponCardNano
          weaponId={equippedWeapon}
          BGComponent={CardLight}
          onClick={onClick}
        />
      </Grid>
      {allArtifactSlotKeys.map((slotKey) => (
        <Grid item key={slotKey} xs={1}>
          <ArtifactCardNano
            artifactId={data.get(input.art[slotKey].id).value?.toString()}
            slotKey={slotKey}
            BGComponent={CardLight}
            onClick={onClick}
          />
        </Grid>
      ))}
    </Grid>
  );
}
/* Image card with star and name and level */
function CharacterProfileCard() {
  const {
    characterSheet,
    character: { key: characterKey, team },
  } = useContext(CharacterContext);
  const { gender } = useDBMeta();
  const { data } = useContext(DataContext);
  const characterDispatch = useCharacterReducer(characterKey);
  const navigate = useNavigate();
  const level = data.get(input.lvl).value;
  const ascension = data.get(input.asc).value as AscensionKey;
  const constellation = data.get(input.constellation).value;
  const tlvl = {
    auto: data.get(input.total.auto).value,
    skill: data.get(input.total.skill).value,
    burst: data.get(input.total.burst).value,
  };
  const tBoost = {
    auto: data.get(input.total.autoBoost).value,
    skill: data.get(input.total.skillBoost).value,
    burst: data.get(input.total.burstBoost).value,
  };
  const card = charCard(characterKey, gender);

  return (
    <CardLight sx={{ height: "100%" }}>
      <CoverArea src={card} level={level} ascension={ascension} />

      <Box>
        <CardActionArea sx={{ p: 1 }} onClick={() => navigate("talent")}>
          <Grid container spacing={1} mt={-1}>
            {(["auto", "skill", "burst"] as TalentSheetElementKey[]).map(
              (tKey) => (
                <Grid item xs={4} key={tKey}>
                  <Badge
                    badgeContent={tlvl[tKey as keyof typeof tlvl]}
                    color={tBoost[tKey as keyof typeof tlvl] ? "info" : "secondary"}
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    sx={{
                      width: "100%",
                      height: "100%",
                      "& > .MuiBadge-badge": {
                        fontSize: "1.25em",
                        padding: ".25em .4em",
                        borderRadius: ".5em",
                        lineHeight: 1,
                        height: "1.25em",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={characterSheet.getTalentOfKey(tKey)?.img}
                      width="100%"
                      height="auto"
                    />
                  </Badge>
                </Grid>
              )
            )}
          </Grid>
        </CardActionArea>
        <Typography sx={{ textAlign: "center", mt: 1 }} variant="h6">
          Constellations
        </Typography>
        <Grid container spacing={1}>
          {range(1, 6).map((i) => (
            <Grid item xs={4} key={i}>
              <CardActionArea
                onClick={() =>
                  characterDispatch({
                    constellation: i === constellation ? i - 1 : i,
                  })
                }
              >
                <Box
                  component="img"
                  src={
                    characterSheet.getTalentOfKey(
                      `constellation${i}` as TalentSheetElementKey
                    )?.img
                  }
                  sx={{
                    ...(constellation >= i
                      ? {}
                      : { filter: "brightness(50%)" }),
                  }}
                  width="100%"
                  height="auto"
                />
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
        <CardActionArea sx={{ p: 1 }} onClick={() => navigate("teambuffs")}>
          <Grid container columns={3} spacing={1}>
            {range(0, 2).map((i) => (
              <Grid key={i} item xs={1} height="100%">
                {team[i] ? (
                  <CharacterCardPico characterKey={team[i] as CharacterKey} />
                ) : (
                  <BlankCharacterCardPico index={i} />
                )}
              </Grid>
            ))}
          </Grid>
        </CardActionArea>
      </Box>
    </CardLight>
  );
}


function CoverArea({ src, level, ascension }:any) {
  const { characterSheet } = useContext(CharacterContext);

  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{ position: "absolute", width: "100%", height: "100%" }}>
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            width: "100%",
            left: "50%",
            bottom: 0,
            transform: "translate(-50%, -50%)",
            opacity: 0.75,
            textAlign: "center",
          }}
        >
          <StarsDisplay stars={characterSheet.rarity} colored />
        </Typography>
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "7%",
            transform: "translate(-50%, -50%)",
            opacity: 0.85,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            px: 1,
          }}
        >
          <CharChip />
        </Box>
        <FavoriteButton />
        <LevelBadge level={level} ascension={ascension} />
      </Box>
      <Box src={src} component="img" width="100%" height="auto"></Box>
    </Box>
  );
}

function CharChip() {
  const { characterSheet } = useContext(CharacterContext);
  const charEle = characterSheet.elementKey;
  return (
    <Chip
      color={charEle}
      sx={{ height: "auto" }}
      label={
        <Typography
          variant="h6"
          sx={{ display: "flex", gap: 1, alignItems: "center" }}
        >
          <ElementIcon ele={charEle} />
          <Box sx={{ whiteSpace: "normal", textAlign: "center" }}>
            {characterSheet.name}
          </Box>
          <ImgIcon
            src={imgAssets.weaponTypes?.[characterSheet.weaponTypeKey]}
          />
        </Typography>
      }
    />
  );
}
function LevelBadge({
  level,
  ascension,
}: {
  level: number;
  ascension: AscensionKey;
}) {
  return (
    <Typography
      sx={{ p: 1, position: "absolute", right: 0, top: 0, opacity: 0.8 }}
    >
      <SqBadge>{getLevelString(level, ascension)}</SqBadge>
    </Typography>
  );
}
function FavoriteButton() {
  const {
    character: { key: characterKey },
  } = useContext(CharacterContext);
  const database = useDatabase();
  const { favorite } = useCharMeta(characterKey) || {};
  return (
    <Box sx={{ position: "absolute", left: 0, top: 0 }}>
      <IconButton
        sx={{ p: 1 }}
        color="error"
        onClick={() =>
          database.charMeta.set(characterKey, { favorite: !favorite })
        }
      >
        {favorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Box>
  );
}
