import React from 'react';

const MODULES = {
  Overview: [
    'Heatmap',
    'Bar Chart Region',
    'Bar Chart Category',
    'KPI Performance Graph'
  ],
  'Deep Dive': [
    'Tabular View',
    'Trend Chart',
    'KPI Comparison'
  ],
  Assortment: [
    'Assortment Matrix',
    'Category Tree'
  ],
  'Inventory Profile': [
    'Inventory Heatmap',
    'Stock Level Chart'
  ],
  'Performance Analyzer': [
    'Performance Table',
    'Performance Graph'
  ]
};

function ModuleConfig({ selectedScreens, storeHierarchies, productHierarchies, moduleConfigs, setModuleConfigs }) {
  // Helper to get hierarchy options
  const getHierarchyOptions = (hierarchies) =>
    hierarchies
      .filter(h => h.columnName && h.label)
      .map(h => ({ key: h.columnName, label: h.label }));

  // Handler for module parameter changes
  const handleParamChange = (screen, module, param, value) => {
    setModuleConfigs(prev => ({
      ...prev,
      [screen]: {
        ...prev[screen],
        [module]: {
          ...prev[screen]?.[module],
          [param]: value
        }
      }
    }));
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h1>Step 3 — Module Configuration</h1>
      {selectedScreens.length === 0 && <div>Select screens to configure modules.</div>}
      {selectedScreens.map(screen => (
        <div key={screen} style={{ marginBottom: 16, border: '1px solid #ccc', padding: 12 }}>
          <h2>{screen}</h2>
          {MODULES[screen]?.map(module => (
            <div key={module} style={{ marginBottom: 12 }}>
              <h3>{module}</h3>
              {/* Example parameters: aggregationLevel, defaultSelectedKpi */}
              <div>
                <label>Store Hierarchy Level:&nbsp;</label>
                <select
                  value={moduleConfigs[screen]?.[module]?.storeHierarchy || ''}
                  onChange={e => handleParamChange(screen, module, 'storeHierarchy', e.target.value)}
                >
                  <option value="">Select</option>
                  {getHierarchyOptions(storeHierarchies).map(opt => (
                    <option key={opt.key} value={opt.key}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Product Hierarchy Level:&nbsp;</label>
                <select
                  value={moduleConfigs[screen]?.[module]?.productHierarchy || ''}
                  onChange={e => handleParamChange(screen, module, 'productHierarchy', e.target.value)}
                >
                  <option value="">Select</option>
                  {getHierarchyOptions(productHierarchies).map(opt => (
                    <option key={opt.key} value={opt.key}>{opt.label}</option>
                  ))}
                </select>
              </div>
              {/* Default KPI selection will be handled in KPI step */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ModuleConfig;
