import { range } from "genshin-optimizer/util";
import { useContext } from "react";
import { SnowContext } from "../../contexts/PrimoContext";
import primo from "../../assets/images/items/Item_Primogem.webp";

export default function Snow() {
  const { snow } = useContext(SnowContext);
  if (!snow) return null;
  return (
    <div id="snowflake-container">
      {range(1, 200).map((i) => (
        <img src={primo} key={i} className="snowflake" />
      ))}
    </div>
  );
}
