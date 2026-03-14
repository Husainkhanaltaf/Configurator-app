import React, { useState } from 'react';

function HierarchyTable({ title, hierarchies, setHierarchies }) {
  const handleChange = (idx, field, value) => {
    const updated = hierarchies.map((row, i) =>
      i === idx ? { ...row, [field]: value } : row
    );
    setHierarchies(updated);
  };

  const addRow = () => {
    setHierarchies([...hierarchies, { hierarchyName: '', columnName: '', label: '' }]);
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <h2>{title}</h2>
      <table border="1" cellPadding="6" style={{ width: '100%', marginBottom: 8 }}>
        <thead>
          <tr>
            <th>Hierarchy Name</th>
            <th>Column Name</th>
            <th>Label</th>
          </tr>
        </thead>
        <tbody>
          {hierarchies.map((row, idx) => (
            <tr key={idx}>
              <td>
                <input
                  value={row.hierarchyName}
                  onChange={e => handleChange(idx, 'hierarchyName', e.target.value)}
                  placeholder="Hierarchy Name"
                />
              </td>
              <td>
                <input
                  value={row.columnName}
                  onChange={e => handleChange(idx, 'columnName', e.target.value)}
                  placeholder="Column Name"
                />
              </td>
              <td>
                <input
                  value={row.label}
                  onChange={e => handleChange(idx, 'label', e.target.value)}
                  placeholder="Label"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Hierarchy</button>
    </div>
  );
}

function HierarchyConfig({ storeHierarchies, setStoreHierarchies, productHierarchies, setProductHierarchies }) {
  return (
    <div>
      <h1>Step 1 — Hierarchies</h1>
      <HierarchyTable
        title="Store Hierarchy"
        hierarchies={storeHierarchies}
        setHierarchies={setStoreHierarchies}
      />
      <HierarchyTable
        title="Product Hierarchy"
        hierarchies={productHierarchies}
        setHierarchies={setProductHierarchies}
      />
    </div>
  );
}

export default HierarchyConfig;
