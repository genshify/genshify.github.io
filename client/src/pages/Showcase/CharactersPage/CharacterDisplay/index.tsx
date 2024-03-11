import { useBoolState } from "genshin-optimizer/react-util";
import type { CharacterKey } from "genshin-optimizer/consts";
import { useCharacter, useDBMeta, useDatabase } from "genshin-optimizer/db-ui";
import { BarChart, Calculate } from "@mui/icons-material";
import { Box, Button, CardContent, Skeleton } from "@mui/material";
import {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Navigate,
  Route,
  Routes,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import { CardThemed } from "genshin-optimizer/ui";
import CardLight from "../../../../libs/GO-files/Components/Card/CardLight";
import CloseButton from "../../../../libs/GO-files/Components/CloseButton";
import {
  HitModeToggle,
  InfusionAuraDropdown,
  ReactionToggle,
} from "../../../../libs/GO-files/Components/HitModeEditor";
import LevelSelect from "../../../../libs/GO-files/Components/LevelSelect";
import { SqBadge } from "genshin-optimizer/ui";
import type { CharacterContextObj } from "../../../../contexts/CharacterContext";
import { CharacterContext } from "../../../../contexts/CharacterContext";
import type { dataContextObj } from "../../../../contexts/DataContext";
import { DataContext } from "../../../../contexts/DataContext";
import {
  FormulaDataContext,
  FormulaDataWrapper,
} from "../../../../contexts/FormulaDataContext";
import type {
  ChartData,
  GraphContextObj,
} from "../../../../contexts/GraphContext";
import { GraphContext } from "../../../../contexts/GraphContext";
import { getCharSheet } from "../../../../libs/GO-files/Data/Characters";
import useCharacterReducer from "../../../../libs/GO-files/ReactHooks/useCharacterReducer";
import useTeamData from "../../../../libs/GO-files/ReactHooks/useTeamData";
import useTitle from "../../../../libs/GO-files/ReactHooks/useTitle";
import CharSelectButton from "./CharSelectButton";
import FormulaModal from "./FormulaModal";
import StatModal from "./StatModal";
import TravelerElementSelect from "./TravelerElementSelect";
import TravelerGenderSelect from "./TravelerGenderSelect";
import TabOverview from "./Tabs/TabOverview";

export default function CharacterDisplay() {
  const navigate = useNavigate();
  const database = useDatabase();
  const onClose = useCallback(() => navigate("/characters"), [navigate]);
  const { characterKey } = useParams<{ characterKey?: CharacterKey }>();
  const invalidKey = !database.chars.keys.includes(
    characterKey as CharacterKey
  );
  if (invalidKey) return <Navigate to="/characters" />;

  return (
    <Box my={1} display="flex" flexDirection="column" gap={1}>
      <Suspense
        fallback={<Skeleton variant="rectangular" width="100%" height={1000} />}
      >
        {characterKey && (
          <CharacterDisplayCard
            key={characterKey}
            characterKey={characterKey}
            onClose={onClose}
          />
        )}
      </Suspense>
    </Box>
  );
}

type CharacterDisplayCardProps = {
  characterKey: CharacterKey;
  onClose?: () => void;
};
function CharacterDisplayCard({
  characterKey,
  onClose,
}: CharacterDisplayCardProps) {
  const character = useCharacter(characterKey);
  const { gender } = useDBMeta();
  const characterSheet = getCharSheet(characterKey, gender);
  const teamData = useTeamData(characterKey);
  const { target: charUIData } = teamData?.[characterKey] ?? {};
  const {
    params: { tab = "overview" },
  } = useMatch({ path: "/characters/:charKey/:tab", end: false }) ?? {
    params: { tab: "overview" },
  };

  useTitle(useMemo(() => `${`character-${tab}`}`, [tab]));

  const characterDispatch = useCharacterReducer(character?.key ?? "");

  const dataContextValue: dataContextObj | undefined = useMemo(() => {
    if (!teamData || !charUIData) return undefined;
    return {
      data: charUIData,
      teamData,
      oldData: undefined,
    };
  }, [charUIData, teamData]);

  const characterContextValue: CharacterContextObj | undefined = useMemo(() => {
    if (!character || !characterSheet) return undefined;
    return {
      character,
      characterSheet,
      characterDispatch,
    };
  }, [character, characterSheet, characterDispatch]);

  const [chartData, setChartData] = useState(
    undefined as ChartData | undefined
  );
  const [graphBuilds, setGraphBuilds] = useState<string[][]>();
  const graphContextValue: GraphContextObj | undefined = useMemo(() => {
    return {
      chartData,
      setChartData,
      graphBuilds,
      setGraphBuilds,
    };
  }, [chartData, graphBuilds]);

  // Clear state when switching characters
  useEffect(() => {
    setChartData(undefined);
    setGraphBuilds(undefined);
  }, [characterKey]);

  return (
    <CardThemed>
      {dataContextValue && characterContextValue && graphContextValue ? (
        <CharacterContext.Provider value={characterContextValue}>
          <DataContext.Provider value={dataContextValue}>
            <GraphContext.Provider value={graphContextValue}>
              <FormulaDataWrapper>
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <Box display="flex">
                    <Box display="flex" gap={1} flexWrap="wrap" flexGrow={1}>
                      <CharSelectButton />
                      <TravelerElementSelect />
                      <TravelerGenderSelect />
                      <DetailStatButton />
                      <FormulasButton />
                    </Box>
                    {!!onClose && <CloseButton onClick={onClose} />}
                  </Box>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {character && (
                      <LevelSelect
                        level={character.level}
                        ascension={character.ascension}
                        setBoth={characterDispatch}
                      />
                    )}
                    <HitModeToggle size="small" />
                    <InfusionAuraDropdown />
                    <ReactionToggle size="small" />
                  </Box>
                  <CardLight></CardLight>
                  <CharacterPanel />
                  <CardLight></CardLight>
                </CardContent>
              </FormulaDataWrapper>
            </GraphContext.Provider>
          </DataContext.Provider>
        </CharacterContext.Provider>
      ) : (
        <Skeleton variant="rectangular" width="100%" height={1000} />
      )}
    </CardThemed>
  );
}
function CharacterPanel() {
  return (
    <Suspense
      fallback={<Skeleton variant="rectangular" width="100%" height={500} />}
    >
      <Routes>
        {/* Character Panel */}
        <Route index element={<TabOverview />} />
        <Route path="/talent" element={<TabOverview />} />
        <Route path="/teambuffs" element={<TabOverview />} />
        <Route path="/optimize" element={<TabOverview />} />
        <Route path="/theorycraft" element={<TabOverview />} />
      </Routes>
    </Suspense>
  );
}

function DetailStatButton() {
  const [open, onOpen, onClose] = useBoolState();
  const {
    character: { bonusStats },
  } = useContext(CharacterContext);
  const bStatsNum = Object.keys(bonusStats).length;
  return (
    <>
      <Button color="info" startIcon={<BarChart />} onClick={onOpen}>
        {`addStats.title`}
        {!!bStatsNum && (
          <SqBadge sx={{ ml: 1 }} color="success">
            {bStatsNum}
          </SqBadge>
        )}
      </Button>
      <StatModal open={open} onClose={onClose} />
    </>
  );
}
function FormulasButton() {
  const { onModalOpen } = useContext(FormulaDataContext);
  return (
    <>
      <Button color="info" startIcon={<Calculate />} onClick={onModalOpen}>
        Formulas {"&"} Calcs
      </Button>
      <FormulaModal />
    </>
  );
}
