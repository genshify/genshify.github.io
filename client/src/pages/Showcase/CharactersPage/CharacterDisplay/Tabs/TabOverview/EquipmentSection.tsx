/* eslint-disable @typescript-eslint/no-unused-vars */
import { useBoolState } from "genshin-optimizer/react-util";
import {
  allArtifactSlotKeys,
  allSubstatKeys,
} from "genshin-optimizer/consts";
import { useCharMeta, useDatabase } from "genshin-optimizer/db-ui";
import { Settings} from "@mui/icons-material";
import {
  Box,
  Button,
  CardContent,
  Grid,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Suspense,
  useCallback,
  useContext,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import SetEffectDisplay from "../../../../../../libs/GO-files/Components/Artifact/SetEffectDisplay";
import SubstatToggle from "../../../../../../libs/GO-files/Components/Artifact/SubstatToggle";
import CardDark from "../../../../../../libs/GO-files/Components/Card/CardDark";
import CardLight from "../../../../../../libs/GO-files/Components/Card/CardLight";
import DocumentDisplay from "../../../../../../libs/GO-files/Components/DocumentDisplay";
import {
  BasicFieldDisplay,
  FieldDisplayList,
} from "../../../../../../libs/GO-files/Components/FieldDisplay";
import ModalWrapper from "../../../../../../libs/GO-files/Components/ModalWrapper";
import PercentBadge from "../../../../../../libs/GO-files/Components/PercentBadge";
import { CharacterContext } from "../../../../../../contexts/CharacterContext";
import { DataContext } from "../../../../../../contexts/DataContext";
import { dataSetEffects } from "../../../../../../libs/GO-files/Data/Artifacts";
import Artifact from "../../../../../../libs/GO-files/Data/Artifacts/Artifact";
import type { IFieldDisplay } from "../../../../../../libs/GO-files/Types/fieldDisplay";
export default function EquipmentSection() {
  const {
    character: { equippedWeapon, key: characterKey },
  } = useContext(CharacterContext);
  const { teamData } = useContext(DataContext);
  const weaponSheet = teamData[characterKey]?.weaponSheet;
  const [weaponId, setweaponId] = useState("");

  //triggers when character swap weapons
  useEffect(() => {
    if (weaponId && weaponId !== equippedWeapon) setweaponId(equippedWeapon);
  }, [weaponId, equippedWeapon]);

  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.up("lg"));

  const weaponDoc = useMemo(
    () =>
      weaponSheet &&
      weaponSheet.document.length > 0 && (
        <CardLight>
          <Box p={1}>
            <DocumentDisplay sections={weaponSheet.document} />
          </Box>
        </CardLight>
      ),
    [weaponSheet]
  );
  return (
    <Box>
      <Suspense fallback={false}>
        {/* <WeaponEditor
          weaponId={weaponId}
          footer
          onClose={hideWeapon}
          extraButtons={
            <LargeWeaponSwapButton
              weaponTypeKey={characterSheet.weaponTypeKey}
            />
          }
        /> */}
      </Suspense>
      <Grid container spacing={1}>
        {breakpoint && (
          <Grid
            item
            xs={12}
            md={12}
            lg={3}
            xl={3}
            sx={{ display: "flex", flexDirection: "column", gap: 1 }}
          >
            {weaponDoc && weaponDoc}
            <ArtifactSectionCard />
          </Grid>
        )}
        <Grid item xs={12} md={12} lg={9} xl={9} container spacing={1}>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            {/* <WeaponCard
              weaponId={equippedWeapon}
              onEdit={showWeapon}
              canEquip
              extraButtons={
                <WeaponSwapButton
                  weaponTypeKey={characterSheet.weaponTypeKey}
                />
              }
            /> */}
          </Grid>
          {allArtifactSlotKeys.map((slotKey) => (
            <Grid item xs={12} sm={6} md={4} key={slotKey}>
              {/* {data.get(input.art[slotKey].id).value ? (
                <ArtifactCard
                  artifactId={data.get(input.art[slotKey].id).value?.toString()}
                  effFilter={deferredRvSet}
                  extraButtons={<ArtifactSwapButton slotKey={slotKey} />}
                  editorProps={{}}
                  canEquip
                />
              ) : (
                <ArtSwapCard slotKey={slotKey} />
              )} */}
            </Grid>
          ))}
        </Grid>
        {!breakpoint && (
          <Grid item xs={12} md={12} xl={3} container spacing={1}>
            {weaponDoc && (
              <Grid item xs={12} md={6} lg={4}>
                {weaponDoc}
              </Grid>
            )}
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <ArtifactSectionCard />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

function ArtifactSectionCard() {
  const { t } = useTranslation(["page_character", "artifact"]);
  const database = useDatabase();
  const {
    character,
    character: { key: characterKey, equippedArtifacts },
  } = useContext(CharacterContext);
  const { data } = useContext(DataContext);
  const hasEquipped = useMemo(
    () => !!Object.values(equippedArtifacts).filter((i) => i).length,
    [equippedArtifacts]
  );
  const unequipArts = useCallback(() => {
    if (!character) return;
    if (
      !window.confirm(
        "Do you want to move all currently equipped artifacts to inventory?"
      )
    )
      return;
    Object.values(equippedArtifacts).forEach((aid) =>
      database.arts.set(aid, { location: "" })
    );
  }, [character, database, equippedArtifacts]);

  const setEffects = useMemo(() => dataSetEffects(data), [data]);
  const { rvFilter } = useCharMeta(characterKey) || {};
  const setRVFilter = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rvFilter: any) => database.charMeta.set(characterKey, { rvFilter }),
    [database, characterKey]
  );

  const [show, onShow, onHide] = useBoolState();
  const deferredrvFilter = useDeferredValue(rvFilter);
  const { rvField, rvmField } = useMemo(() => {
    const {
      currentEfficiency,
      currentEfficiency_,
      maxEfficiency,
      maxEfficiency_,
    } = Object.values(equippedArtifacts).reduce(
      (a, artid) => {
        const art = database.arts.get(artid);
        if (art) {
          const { currentEfficiency, maxEfficiency } =
            Artifact.getArtifactEfficiency(art, new Set(deferredrvFilter));
          const {
            currentEfficiency: currentEfficiency_,
            maxEfficiency: maxEfficiency_,
          } = Artifact.getArtifactEfficiency(art, new Set(allSubstatKeys));
          a.currentEfficiency = a.currentEfficiency + currentEfficiency;
          a.maxEfficiency = a.maxEfficiency + maxEfficiency;

          a.currentEfficiency_ = a.currentEfficiency_ + currentEfficiency_;
          a.maxEfficiency_ = a.maxEfficiency_ + maxEfficiency_;
        }
        return a;
      },
      {
        currentEfficiency: 0,
        currentEfficiency_: 0,
        maxEfficiency: 0,
        maxEfficiency_: 0,
      }
    );
    const rvField: IFieldDisplay = {
      text: t`artifact:editor.curSubEff`,
      value: !(currentEfficiency - currentEfficiency_) ? (
        <PercentBadge value={currentEfficiency} max={4500} valid />
      ) : (
        <span>
          <PercentBadge value={currentEfficiency} max={4500} valid /> /{" "}
          <PercentBadge value={currentEfficiency_} max={4500} valid />
        </span>
      ),
    };
    const rvmField: IFieldDisplay = {
      text: t`artifact:editor.maxSubEff`,
      canShow: () => !!(currentEfficiency_ - maxEfficiency_),
      value: !(maxEfficiency - maxEfficiency_) ? (
        <PercentBadge value={maxEfficiency} max={4500} valid />
      ) : (
        <span>
          <PercentBadge value={maxEfficiency} max={4500} valid /> /{" "}
          <PercentBadge value={maxEfficiency_} max={4500} valid />
        </span>
      ),
    };
    return { rvField, rvmField };
  }, [t, deferredrvFilter, equippedArtifacts, database]);

  return (
    <CardLight>
      {hasEquipped && (
        <Button
          color="error"
          onClick={unequipArts}
          fullWidth
          sx={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
        >{t`tabEquip.unequipArts`}</Button>
      )}
      <Box p={1}>
        <Stack spacing={1}>
          <CardDark>
            <Button
              fullWidth
              color="info"
              startIcon={<Settings />}
              sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              onClick={onShow}
            >
              RV Filter
            </Button>
            <ModalWrapper open={show} onClose={onHide}>
              <CardDark>
                <CardContent>
                  <Typography
                    textAlign="center"
                    gutterBottom
                    variant="h6"
                  >{t`artifact:efficiencyFilter.title`}</Typography>
                  <SubstatToggle
                    selectedKeys={rvFilter}
                    onChange={setRVFilter}
                  />
                </CardContent>
              </CardDark>
            </ModalWrapper>
            <FieldDisplayList>
              <BasicFieldDisplay field={rvField} component={ListItem} />
              {rvmField?.canShow?.(data) && (
                <BasicFieldDisplay field={rvmField} component={ListItem} />
              )}
            </FieldDisplayList>
          </CardDark>
          {setEffects &&
            Object.entries(setEffects).flatMap(([setKey, setNumKeyArr]) =>
              setNumKeyArr.map((setNumKey) => (
                <SetEffectDisplay
                  key={setKey + setNumKey}
                  setKey={setKey}
                  setNumKey={setNumKey}
                />
              ))
            )}
        </Stack>
      </Box>
    </CardLight>
  );
}
