import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_pg_user',
  host: 'localhost',
  database: 'configurator',
  password: 'your_pg_password',
  port: 5432,
});

// API Endpoints
app.post('/generate-config', (req, res) => {
  // Build configuration JSON from user input
  const { selectedScreens, moduleConfigs, storeHierarchies, productHierarchies } = req.body;
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
              label: modules[module].defaultKpi,
              value: modules[module].defaultKpi
            }
          : null
      };
    });
  });
  res.json({ message: 'Config generated', config });
});

app.get('/review-config', (req, res) => {
  // Return configuration preview (stub)
  res.json({ message: 'Config review', config: {} });
});

app.post('/approve-config', async (req, res) => {
  // Persist configuration to database
  const { selectedScreens, moduleConfigs, storeHierarchies, productHierarchies, configJSON } = req.body;
  try {
    // Store hierarchies
    for (const h of storeHierarchies) {
      await pool.query(
        'INSERT INTO hierarchies (hierarchy_type, hierarchy_name, column_name, label) VALUES ($1, $2, $3, $4)',
        ['store', h.hierarchyName, h.columnName, h.label]
      );
    }
    for (const h of productHierarchies) {
      await pool.query(
        'INSERT INTO hierarchies (hierarchy_type, hierarchy_name, column_name, label) VALUES ($1, $2, $3, $4)',
        ['product', h.hierarchyName, h.columnName, h.label]
      );
    }
    // Store screens
    for (const screen of selectedScreens) {
      await pool.query(
        'INSERT INTO screens (screen_name) VALUES ($1)',
        [screen]
      );
    }
    // Store module configs
    for (const screen of selectedScreens) {
      const modules = moduleConfigs[screen] || {};
      for (const module of Object.keys(modules)) {
        await pool.query(
          'INSERT INTO config_modules (screen_name, module_name, module_config) VALUES ($1, $2, $3)',
          [screen, module, JSON.stringify(modules[module])]
        );
      }
    }
    res.json({ message: 'Config approved and saved' });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.put('/edit-config', (req, res) => {
  // Modify configuration (stub)
  res.json({ message: 'Config edited' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
