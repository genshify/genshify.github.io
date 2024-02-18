//import components
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Beginner from "./pages/Beginner/Beginner";
import Navbar from "./components/Navbar/Navbar";
import Showcase from "./pages/Showcase/Showcase";
import CharacterDisplay from "./tools/genshin-optimizer/app/PageCharacter/CharacterDisplay";
import PageCharacter from "./tools/genshin-optimizer/app/PageCharacter";

import {

  Container,
  CssBaseline,
  Grid,
  Skeleton,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { DatabaseContext } from "genshin-optimizer/db-ui";
import { theme } from "genshin-optimizer/ui";
import { HashRouter, Route, Routes } from "react-router-dom";

import ErrorBoundary from "./tools/genshin-optimizer/app/ErrorBoundary";
import "./App.scss";

import { Suspense, useCallback, useMemo, useState } from "react";
import { ArtCharDatabase } from "genshin-optimizer/db";
import { DBLocalStorage, SandboxStorage } from "genshin-optimizer/database";
import Footer from "./components/Navbar/Footer";
import Header from "./components/Navbar/Header";

export default function App() {
  const dbIndex = parseInt(localStorage.getItem("dbIndex") || "1");
  const [databases, setDatabases] = useState(() => {
    localStorage.removeItem("GONewTabDetection");
    localStorage.setItem("GONewTabDetection", "debug");
    return ([1, 2, 3, 4] as const).map((index) => {
      if (index === dbIndex) {
        return new ArtCharDatabase(index, new DBLocalStorage(localStorage));
      } else {
        const dbName = `extraDatabase_${index}`;
        const eDB = localStorage.getItem(dbName);
        const dbObj = eDB ? JSON.parse(eDB) : {};
        const db = new ArtCharDatabase(index, new SandboxStorage(dbObj));
        db.toExtraLocalDB();
        return db;
      }
    });
  });
  const setDatabase = useCallback(
    (index: number, db: ArtCharDatabase) => {
      const dbs = [...databases];
      dbs[index] = db;
      setDatabases(dbs);
    },
    [databases, setDatabases]
  );

  const database = databases[dbIndex - 1];
  const dbContextObj = useMemo(
    () => ({ databases, setDatabases, database, setDatabase }),
    [databases, setDatabases, database, setDatabase]
  );
  return (
    <StyledEngineProvider injectFirst>
      {/* https://mui.com/guides/interoperability/#css-injection-order-2 */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DatabaseContext.Provider value={dbContextObj}>
          <ErrorBoundary>
            <HashRouter basename="/">
              <Suspense fallback={null}></Suspense>

              {/* navbar */}

              <Content/>
            </HashRouter>
          </ErrorBoundary>
        </DatabaseContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

function Content() {
  return (
    <Grid container direction="column" minHeight="100vh" position="relative">
      <Grid item>
        <Header anchor="back-to-top-anchor" />
      </Grid>
      <Container maxWidth="xl" sx={{ px: { xs: 0.5, sm: 1, md: 2 } }}>
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              sx={{ width: "100%", height: "100%" }}
            />
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/beginner" element={<Beginner />} />
            <Route path="/showcase" element={<Showcase />} />
            <Route path="/characters/*">
              <Route index element={<PageCharacter />} />
              <Route path=":characterKey/*" element={<CharacterDisplay />} />
            </Route>
          </Routes>
        </Suspense>
      </Container>
      {/* make sure footer is always at bottom */}
      <Grid item flexGrow={1} />
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}
