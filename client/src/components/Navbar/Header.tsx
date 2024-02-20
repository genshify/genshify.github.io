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
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Suspense, useState } from "react";

type ITab = {
  to: string;
  value: string;
};

const home: ITab = {
  to: "/",
  value: "home",
};

const about: ITab = {
  to: "/about",
  value: "about",
};
const banner: ITab = {
  to: "/banner",
  value: "banner",
};
const events: ITab = {
  to: "/events",
  value: "events",
};
const tips: ITab = {
  to: "/tips",
  value: "tips",
};
const showcase: ITab = {
  to: "/showcase",
  value: "showcase",
};

export default function Header({ anchor }: { anchor: string }) {
  return (
    <Suspense fallback={<Skeleton variant="rectangular" height={56} />}>
      <HeaderContent anchor={anchor} />
    </Suspense>
  );
}

const maincontent = [home,about, banner, events, tips, showcase] as const;
function HeaderContent({ anchor }: { anchor: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    params: { currentTab },
  } = useMatch({ path: "/:currentTab", end: false }) ?? {
    params: { currentTab: "" },
  };
  if (isMobile)
    return <MobileHeader anchor={anchor} currentTab={currentTab ?? ""} />;
  return (
    <Box>
      <AppBar position="static" sx={{ bgcolor: "#edfdf1" }} elevation={0} id={anchor}>
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
              },
              "& .MuiTab-root:hover": {
                transition: "background-color 0.5s ease",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            {maincontent.map(({ to, value }) => {
              return (
                <Tab
                  key={value}
                  value={value}
                  component={Link}
                  to={to}
                  iconPosition="start"
                  label={
                    <Box display="flex" gap={1} alignItems="center">
                      <p>{value}</p>
                    </Box>
                  }
                  sx={{ ml: value === "setting" ? "auto" : undefined }}
                />
              );
            })}
          </Tabs>
        </div>
      </AppBar>
    </Box>
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
