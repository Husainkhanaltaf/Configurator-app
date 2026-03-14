import React from 'react';

function generateConfigJSON(selectedScreens, moduleConfigs, storeHierarchies, productHierarchies) {
  const config = {};
  selectedScreens.forEach(screen => {
    config[screen.toLowerCase().replace(/\s+/g, '_')] = {};
    const modules = moduleConfigs[screen] || {};
    Object.keys(modules).forEach(module => {
      config[screen.toLowerCase().replace(/\s+/g, '_')][module.toLowerCase().replace(/\s+/g, '_')] = {
        aggregationLevel: {
          storeHierarchy: modules[module].storeHierarchy ? [modules[module].storeHierarchy] : [],
          productHierarchy: modules[module].productHierarchy ? [modules[module].productHierarchy] : []
        },
        defaultSelectedKpi: modules[module].defaultKpi
          ? {
              key: modules[module].defaultKpi,
              label: getKpiLabel(modules[module].defaultKpi),
              value: modules[module].defaultKpi
            }
          : null
      };
    });
  });
  return config;
}

function getKpiLabel(value) {
  const KPI_METRICS = [
    { label: 'Net Sales', value: 'sales' },
    { label: 'Margin', value: 'margin' },
    { label: 'Inventory', value: 'inventory' },
    { label: 'Sales Units', value: 'sales_units' }
  ];
  const found = KPI_METRICS.find(kpi => kpi.value === value);
  return found ? found.label : value;
}

function JSONPreview({ selectedScreens, moduleConfigs, storeHierarchies, productHierarchies }) {
  const configJSON = generateConfigJSON(selectedScreens, moduleConfigs, storeHierarchies, productHierarchies);
  return (
    <div style={{ marginBottom: 24 }}>
      <h1>Step 5 — Generated JSON Preview</h1>
      <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 4 }}>
        {JSON.stringify(configJSON, null, 2)}
      </pre>
    </div>
  );
}

export default JSONPreview;
