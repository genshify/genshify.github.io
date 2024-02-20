import "./navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/Genshify_logo_for_Light.png";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Skeleton,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Suspense, useState } from "react";
// type ITab = {
//   i18Key: string;
//   icon: Displayable;
//   to: string;
//   value: string;
//   textSuffix?: Displayable;
// };
// const artifacts: ITab = {
//   i18Key: "tabs.artifacts",
//   icon: <FlowerIcon />,
//   to: "/artifacts",
//   value: "artifacts",
//   textSuffix: <ArtifactChip key="weaponAdd" />,
// };
// const weapons: ITab = {
//   i18Key: "tabs.weapons",
//   icon: <AnvilIcon />,
//   to: "/weapons",
//   value: "weapons",
//   textSuffix: <WeaponChip key="weaponAdd" />,
// };
// const characters: ITab = {
//   i18Key: "tabs.characters",
//   icon: <People />,
//   to: "/characters",
//   value: "characters",
//   textSuffix: <CharacterChip key="charAdd" />,
// };
// const tools: ITab = {
//   i18Key: "tabs.tools",
//   icon: <Construction />,
//   to: "/tools",
//   value: "tools",
// };
// const scanner: ITab = {
//   i18Key: "tabs.scanner",
//   icon: <Scanner />,
//   to: "/scanner",
//   value: "scanner",
// };
// const doc: ITab = {
//   i18Key: "tabs.doc",
//   icon: <Article />,
//   to: "/doc",
//   value: "doc",
// };
// const setting: ITab = {
//   i18Key: "tabs.setting",
//   icon: <Settings />,
//   to: "/setting",
//   value: "setting",
//   textSuffix: <DBChip />,
// };

// function DBChip() {
//   const { name } = useDBMeta();
//   return <Chip color="success" label={name} />;
// }

// function ArtifactChip() {
//   const database = useDatabase();
//   const [dirty, setDirty] = useForceUpdate();
//   useEffect(
//     () => database.arts.followAny(() => setDirty()),
//     [database, setDirty]
//   );
//   const total = useMemo(
//     () => dirty && database.arts.keys.length,
//     [dirty, database]
//   );
//   return <Chip label={<strong>{total}</strong>} size="small" />;
// }
// function CharacterChip() {
//   const database = useDatabase();
//   const [dirty, setDirty] = useForceUpdate();
//   useEffect(
//     () => database.chars.followAny(() => setDirty()),
//     [database, setDirty]
//   );
//   const total = useMemo(
//     () => dirty && database.chars.keys.length,
//     [dirty, database]
//   );
//   return <Chip label={<strong>{total}</strong>} size="small" />;
// }
// function WeaponChip() {
//   const database = useDatabase();
//   const [dirty, setDirty] = useForceUpdate();
//   useEffect(
//     () => database.weapons.followAny(() => setDirty()),
//     [database, setDirty]
//   );
//   const total = useMemo(
//     () => dirty && database.weapons.keys.length,
//     [database, dirty]
//   );
//   return <Chip label={<strong>{total}</strong>} size="small" />;
// }

export default function Header({ anchor }: { anchor: string }) {
  return (
    <Suspense fallback={<Skeleton variant="rectangular" height={56} />}>
      <HeaderContent anchor={anchor} />
    </Suspense>
  );
}

// const maincontent = [
//   artifacts,
//   weapons,
//   characters,
//   tools,
//   scanner,
//   doc,
//   setting,
// ] as const;
function HeaderContent({ anchor }: { anchor: string }) {
  const theme = useTheme();
  // const isXL = useMediaQuery(theme.breakpoints.up("xl"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // const { t } = useTranslation("ui");
  // const {
  //   params: { currentTab },
  // } = useMatch({ path: "/:currentTab", end: false }) ?? {
  //   params: { currentTab: "" },
  // };
  if (isMobile) return <MobileHeader anchor={anchor} currentTab={""} />;
  return (
    <div className="header">
      <nav className="nav container">
        <a href="#" className="nav__logo">
          <img src={logo} alt="GENSHIFY" />
        </a>

        <div className="nav__menu" id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="" className="nav__link ">
                Home
              </Link>
            </li>
            <li className="nav__item">
              <Link to="about" className="nav__link ">
                About
              </Link>
            </li>
            <li className="nav__item">
              <Link to="Banner" className="nav__link ">
                Banner
              </Link>
            </li>
            <li className="nav__item">
              <Link to="Events" className="nav__link ">
                Events
              </Link>
            </li>
            <li className="nav__item">
              <Link to="Tips" className="nav__link ">
                Tips
              </Link>
            </li>
            <li className="nav__item">
              <Link to="showcase" className="nav__link ">
                Showcase
              </Link>
            </li>
            <div className="nav__close" id="nav-close">
              <i className="ri-close-line"></i>
            </div>
          </ul>
        </div>
        <div className="nav__buttons">
          <i className="ri-sun-fill"></i>
          <div className="nav__toggle" id="nav-toggle">
            <i className="ri-menu-line"></i>
          </div>
        </div>
      </nav>
    </div>
  );
}

// const mobileContent = [
//   artifacts,
//   weapons,
//   characters,
//   tools,
//   scanner,
//   doc,
//   setting,
// ] as const;
function MobileHeader({ anchor }: { anchor: string; currentTab: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const { t } = useTranslation("ui");
  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#edfdf1" }} elevation={0}>
        <Drawer
          className="nav__drawer"
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <List>
            <ListItemButton className="nav__item">
              <Link to="" className="nav__link ">
                Home
              </Link>
            </ListItemButton>
            <ListItemButton className="nav__item">
              <Link to="about" className="nav__link ">
                About
              </Link>
            </ListItemButton>
            <ListItemButton className="nav__item">
              <Link to="Banner" className="nav__link ">
                Banner
              </Link>
            </ListItemButton>
            <ListItemButton className="nav__item">
              <Link to="Events" className="nav__link ">
                Events
              </Link>
            </ListItemButton>
            <ListItemButton className="nav__item">
              <Link to="Tips" className="nav__link ">
                Tips
              </Link>
            </ListItemButton>
            <ListItemButton className="nav__item">
              <Link to="showcase" className="nav__link ">
                Showcase
              </Link>
            </ListItemButton>
            <div className="nav__close" id="nav-close">
              <i className="ri-close-line"></i>
            </div>
          </List>
        </Drawer>
        <Toolbar>
          <Box flexGrow={1} />
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* add a blank toolbar to keep space and provide a scroll anchor */}
      <Toolbar id={anchor} />
    </>
  );
}
