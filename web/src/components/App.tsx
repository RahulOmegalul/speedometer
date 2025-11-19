import React, { useState } from "react";
import "./App.css";
import { debugData } from "../utils/debugData";
import { useNuiEvent } from "../hooks/useNuiEvent";

interface SpeedometerData {
  speed: number;
  fuel: number;
  rpm: number;
  gear: number;
  isEngineOn: boolean;
}

const App: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [speedometerData, setSpeedometerData] = useState<SpeedometerData>({
    speed: 0,
    fuel: 100,
    rpm: 0,
    gear: 0,
    isEngineOn: false,
  });

  // This will set the NUI to visible if we are
  // developing in browser
  debugData([
    {
      action: "setVisible",
      data: true,
    },
  ]);

  useNuiEvent<boolean>("setVisible", (data) => {
    if (data) {
      setVisible(true);
      setIsTransitioning(true);
    } else {
      setIsTransitioning(false);
      setTimeout(() => {
        setVisible(false);
      }, 500);
    }
  });

  useNuiEvent<SpeedometerData>("updateSpeedometer", (data) => {
    setSpeedometerData(data);
  });

  if (!visible) {
    return null;
  }

  return (
    <div className={`app-container ${isTransitioning ? "visible" : "hidden"}`}>
      <div className="speedometer">
        <div className="speed">Speed: {speedometerData.speed} km/h</div>
        <div className="fuel">Fuel: {speedometerData.fuel}%</div>
        <div className="rpm">RPM: {speedometerData.rpm}</div>
        <div className="gear">Gear: {speedometerData.gear}</div>
        <div className="engine">
          Engine: {speedometerData.isEngineOn ? "On" : "Off"}
        </div>
      </div>
    </div>
  );
};

export default App;
