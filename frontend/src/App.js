import React from 'react';


import HierarchyConfig from './HierarchyConfig';
import ScreenSelection from './ScreenSelection';
import ModuleConfig from './ModuleConfig';
import KPISelection from './KPISelection';
import JSONPreview from './JSONPreview';
import ReviewApproval from './ReviewApproval';

  const [storeHierarchies, setStoreHierarchies] = React.useState([
    { hierarchyName: '', columnName: '', label: '' }
  ]);
  const [productHierarchies, setProductHierarchies] = React.useState([
    { hierarchyName: '', columnName: '', label: '' }
  ]);
  const [selectedScreens, setSelectedScreens] = React.useState([]);
  const [moduleConfigs, setModuleConfigs] = React.useState({});

  const [reviewMode, setReviewMode] = React.useState(false);
  const [rejected, setRejected] = React.useState(false);

  // Generate config JSON
  const generateConfigJSON = (selectedScreens, moduleConfigs, storeHierarchies, productHierarchies) => {
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
  };

  const getKpiLabel = value => {
    const KPI_METRICS = [
      { label: 'Net Sales', value: 'sales' },
      { label: 'Margin', value: 'margin' },
      { label: 'Inventory', value: 'inventory' },
      { label: 'Sales Units', value: 'sales_units' }
    ];
    const found = KPI_METRICS.find(kpi => kpi.value === value);
    return found ? found.label : value;
  };

  const configJSON = generateConfigJSON(selectedScreens, moduleConfigs, storeHierarchies, productHierarchies);

  const handleReview = () => setReviewMode(true);
  const handleEdit = () => setReviewMode(false);
  const handleReject = () => {
    setRejected(true);
    setReviewMode(false);
  };
  const handleApprove = () => {
    // TODO: Call backend API to persist config
    alert('Configuration approved and saved!');
    setReviewMode(false);
  };

  return (
    <div>
      <h1>Configurator</h1>
      {!reviewMode && !rejected && (
        <>
          <HierarchyConfig
            storeHierarchies={storeHierarchies}
            setStoreHierarchies={setStoreHierarchies}
            productHierarchies={productHierarchies}
            setProductHierarchies={setProductHierarchies}
          />
          <ScreenSelection
            selectedScreens={selectedScreens}
            setSelectedScreens={setSelectedScreens}
          />
          <ModuleConfig
            selectedScreens={selectedScreens}
            storeHierarchies={storeHierarchies}
            productHierarchies={productHierarchies}
            moduleConfigs={moduleConfigs}
            setModuleConfigs={setModuleConfigs}
          />
          <KPISelection
            selectedScreens={selectedScreens}
            moduleConfigs={moduleConfigs}
            setModuleConfigs={setModuleConfigs}
          />
          <JSONPreview
            selectedScreens={selectedScreens}
            moduleConfigs={moduleConfigs}
            storeHierarchies={storeHierarchies}
            productHierarchies={productHierarchies}
          />
          <button onClick={handleReview} style={{ marginTop: 24 }}>Review Configuration</button>
        </>
      )}
      {reviewMode && (
        <ReviewApproval
          storeHierarchies={storeHierarchies}
          productHierarchies={productHierarchies}
          selectedScreens={selectedScreens}
          moduleConfigs={moduleConfigs}
          configJSON={configJSON}
          onApprove={handleApprove}
          onEdit={handleEdit}
          onReject={handleReject}
        />
      )}
      {rejected && (
        <div style={{ marginTop: 32 }}>
          <h2>Configuration Rejected</h2>
          <button onClick={() => setRejected(false)}>Start New Configuration</button>
        </div>
      )}
    </div>
  );
}

export default App;
}

export default App;
