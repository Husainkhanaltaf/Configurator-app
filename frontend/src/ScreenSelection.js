import React, { useState } from 'react';

const SCREENS = [
  'Overview',
  'Deep Dive',
  'Assortment',
  'Inventory Profile',
  'Performance Analyzer'
];

function ScreenSelection({ selectedScreens, setSelectedScreens }) {
  const handleToggle = (screen) => {
    if (selectedScreens.includes(screen)) {
      setSelectedScreens(selectedScreens.filter(s => s !== screen));
    } else {
      setSelectedScreens([...selectedScreens, screen]);
    }
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h1>Step 2 — Screen Selection</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {SCREENS.map(screen => (
          <li key={screen} style={{ marginBottom: 8 }}>
            <label>
              <input
                type="checkbox"
                checked={selectedScreens.includes(screen)}
                onChange={() => handleToggle(screen)}
              />
              {screen}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScreenSelection;
