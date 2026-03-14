import React from 'react';

function ReviewApproval({
  storeHierarchies,
  productHierarchies,
  selectedScreens,
  moduleConfigs,
  configJSON,
  onApprove,
  onEdit,
  onReject
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1>Step 6 — Review Configuration</h1>
      <h2>Hierarchies</h2>
      <table border="1" cellPadding="6" style={{ marginBottom: 16 }}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Hierarchy Name</th>
            <th>Column Name</th>
            <th>Label</th>
          </tr>
        </thead>
        <tbody>
          {storeHierarchies.map((h, idx) => (
            <tr key={idx}>
              <td>Store</td>
              <td>{h.hierarchyName}</td>
              <td>{h.columnName}</td>
              <td>{h.label}</td>
            </tr>
          ))}
          {productHierarchies.map((h, idx) => (
            <tr key={idx}>
              <td>Product</td>
              <td>{h.hierarchyName}</td>
              <td>{h.columnName}</td>
              <td>{h.label}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Screens Enabled</h2>
      <ul>
        {selectedScreens.map(screen => (
          <li key={screen}>{screen}</li>
        ))}
      </ul>
      <h2>Module Configuration</h2>
      {selectedScreens.map(screen => (
        <div key={screen} style={{ marginBottom: 12 }}>
          <h3>{screen}</h3>
          {Object.keys(moduleConfigs[screen] || {}).map(module => (
            <div key={module} style={{ marginLeft: 16 }}>
              <strong>{module}</strong>
              <ul>
                <li>Store Hierarchy: {moduleConfigs[screen][module].storeHierarchy}</li>
                <li>Product Hierarchy: {moduleConfigs[screen][module].productHierarchy}</li>
                <li>Default KPI: {moduleConfigs[screen][module].defaultKpi}</li>
              </ul>
            </div>
          ))}
        </div>
      ))}
      <h2>Generated JSON Preview</h2>
      <pre style={{ background: '#f5f5f5', padding: 16, borderRadius: 4 }}>
        {JSON.stringify(configJSON, null, 2)}
      </pre>
      <div style={{ marginTop: 24 }}>
        <button onClick={onApprove} style={{ marginRight: 12 }}>Approve</button>
        <button onClick={onEdit} style={{ marginRight: 12 }}>Edit</button>
        <button onClick={onReject}>Reject</button>
      </div>
    </div>
  );
}

export default ReviewApproval;
