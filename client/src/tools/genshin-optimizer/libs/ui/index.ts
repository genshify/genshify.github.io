import "./App.scss";
export * from "./Artifact";
export * from "./Theme";
export * from "./Weapon";
export * from "./Character";
export * from "./getVariant";
export * from "./components";
export * from "./hooks";

declare module "@mui/material/styles" {
  interface Palette {
    contentDark: Palette["primary"];
    contentDarker: Palette["primary"];
    contentLight: Palette["primary"];
  }
}
