import React from 'react';

const KPI_METRICS = [
  { label: 'Net Sales', value: 'sales' },
  { label: 'Margin', value: 'margin' },
  { label: 'Inventory', value: 'inventory' },
  { label: 'Sales Units', value: 'sales_units' }
];

function KPISelection({ selectedScreens, moduleConfigs, setModuleConfigs }) {
  const handleKpiChange = (screen, module, kpi) => {
    setModuleConfigs(prev => ({
      ...prev,
      [screen]: {
        ...prev[screen],
        [module]: {
          ...prev[screen]?.[module],
          defaultKpi: kpi
        }
      }
    }));
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h1>Step 4 — KPI Selection</h1>
      {selectedScreens.length === 0 && <div>Select screens to configure KPIs.</div>}
      {selectedScreens.map(screen => (
        <div key={screen} style={{ marginBottom: 16, border: '1px solid #ccc', padding: 12 }}>
          <h2>{screen}</h2>
          {Object.keys(moduleConfigs[screen] || {}).map(module => (
            <div key={module} style={{ marginBottom: 12 }}>
              <h3>{module}</h3>
              <label>Default KPI:&nbsp;</label>
              <select
                value={moduleConfigs[screen][module]?.defaultKpi || ''}
                onChange={e => handleKpiChange(screen, module, e.target.value)}
              >
                <option value="">Select</option>
                {KPI_METRICS.map(kpi => (
                  <option key={kpi.value} value={kpi.value}>{kpi.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default KPISelection;
