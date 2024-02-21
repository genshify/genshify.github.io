import "./navbar.css";
import { Link, useMatch } from "react-router-dom";
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
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Suspense, useState } from "react";
import { SnowToggle } from "../Effects/PrimoToggle";

type ITab = {
  to: string;
  value: string;
  name: string;
};

const home: ITab = {
  to: "/",
  value: "home",
  name: "Home",
};

const about: ITab = {
  to: "/about",
  value: "about",
  name: "About",
};
const banner: ITab = {
  to: "/banner",
  value: "banner",
  name: "Banner",
};
const events: ITab = {
  to: "/events",
  value: "events",
  name: "Events",
};
const tips: ITab = {
  to: "/tips",
  value: "tips",
  name: "Tips",
};
const showcase: ITab = {
  to: "/showcase",
  value: "showcase",
  name: "Showcase",
};
const content = [home, about, banner, events, tips, showcase] as const;
export default function Header({ anchor }: { anchor: string }) {
  return (
    <Suspense fallback={<Skeleton variant="rectangular" height={56} />}>
      <HeaderContent anchor={anchor} />
      <SnowToggle />
    </Suspense>
  );
}

function HeaderContent({ anchor }: { anchor: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    params: { currentTab },
  } = useMatch({ path: "/:currentTab", end: false }) ?? {
    params: { currentTab: "home" },
  };
  if (isMobile)
    return <MobileHeader anchor={anchor} currentTab={currentTab ?? "home"} />;
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ bgcolor: "#edfdf1" }}
        elevation={0}
        id={anchor}
      >
        <div className="nav">
          <Box display="flex" alignItems="center">
            <Link to={"/"}>
              <img
                src={logo}
                style={{
                  width: "80px",
                  marginRight: "10px",
                  marginLeft: "10px",
                }}
                alt=""
              />
            </Link>
          </Box>
          <Tabs
            centered
            value={currentTab}
            sx={{
              "& .MuiTab-root": {
                p: 1,
                minWidth: "auto",
                minHeight: "auto",
                color: "var(--darkGreen)",
                textTransform: "none",
                fontFamily: "var(--font)",
                fontSize: "1rem",
                borderRadius: "5px",
              },
              "& .MuiTab-root:hover": {
                transition: "background-color 0.5s ease",
                bgcolor: "var(--mediumGreen)",
              },
              ".MuiTabs-indicator": {
                bgcolor: "var(--mediumGreen)",
              },
            }}
          >
            {content.map(({ to, value, name }) => {
              return (
                <Tab
                  key={value}
                  value={value}
                  component={Link}
                  to={to}
                  iconPosition="start"
                  label={
                    <Box display="flex" gap={1} alignItems="center">
                      <p>{name}</p>
                    </Box>
                  }
                  sx={{
                    ml: value === "setting" ? "auto" : undefined,
                  }}
                />
              );
            })}
          </Tabs>
        </div>
      </AppBar>
    </Box>
  );
}

// for mobile devices

function MobileHeader({
  anchor,
  currentTab,
}: {
  anchor: string;
  currentTab: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="static"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
        sx={{ bgcolor: "#edfdf1" }}
        elevation={0}
      >
        <Box display="flex" alignItems="center">
          <Link to={"/"}>
            <img
              src={logo}
              style={{
                width: "80px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
              alt=""
            />
          </Link>
        </Box>
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <List>
            {content.map(({ to, value, name }) => {
              return (
                <ListItemButton
                  key={value}
                  to={to}
                  component={Link}
                  onClick={handleDrawerToggle}
                  selected={currentTab === value}
                  className="nav__item"
                >
                  {name}
                </ListItemButton>
              );
            })}
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
