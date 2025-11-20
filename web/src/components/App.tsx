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
  maxSpeed: number;
}

const App: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const [speedometerData, setSpeedometerData] = useState<SpeedometerData>({
    speed: 80,
    fuel: 45,
    rpm: 1255,
    gear: 4,
    isEngineOn: true,
    maxSpeed: 200,
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
      setShouldRender(true);
      requestAnimationFrame(() => {
        setTimeout(() => setVisible(true), 50);
      });
    } else {
      setVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 350); // Slightly longer than animation
    }
  });

  useNuiEvent<SpeedometerData>("updateSpeedometer", (data) => {
    setSpeedometerData(data);
  });

  if (!shouldRender) {
    return null;
  }

  // Calculate speed percentage for the arc (max speed 200 km/h)
  const speedPercentage = Math.min((speedometerData.speed / speedometerData.maxSpeed) * 100, 100);
  const arcLength = 2 * Math.PI * 110; // radius = 110
  const arcOffset = arcLength - (arcLength * speedPercentage) / 100;

  return (
    <div className={`app-container ${visible ? "visible" : "hidden"}`}>
      <div className="speedometer">
        {/* Speed arc */}
        <div className="speed-arc">
          <svg width="240" height="240" viewBox="0 0 240 240">
            {/* Background arc */}
            <circle
              cx="120"
              cy="120"
              r="110"
              fill="none"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="8"
              strokeDasharray={arcLength}
            />
            {/* Progress arc */}
            <circle
              cx="120"
              cy="120"
              r="110"
              fill="none"
              stroke="#2ecc71"
              strokeWidth="8"
              strokeDasharray={arcLength}
              strokeDashoffset={arcOffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.3s ease'
              }}
            />
          </svg>
        </div>

        {/* Gear indicator */}
        <div className="gear-indicator">
          {speedometerData.gear < 0 ? 'R' : speedometerData.gear === 0 ? 'N' : speedometerData.gear}
        </div>

        {/* Status indicators */}
        <div className="status-indicators">
          <div className={`status-icon ${speedometerData.isEngineOn ? 'engine-on' : 'engine-off'}`}>
            ⚡
          </div>
        </div>

        {/* Main speed display */}
        <div className="speed-value">{speedometerData.speed}</div>
        <div className="speed-unit">km/h</div>

        {/* Bottom info row */}
        <div className="info-row">
          <div className="info-item">
            <span className="info-label">FUEL</span>
            <span className="info-value fuel">{speedometerData.fuel}%</span>
          </div>
          <div className="info-item">
            <span className="info-label">RPM</span>
            <span className="info-value">{(speedometerData.rpm / 1000).toFixed(1)}k</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;