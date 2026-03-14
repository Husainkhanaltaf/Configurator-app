# PostgreSQL Schema

-- Relational tables
CREATE TABLE hierarchies (
  id SERIAL PRIMARY KEY,
  hierarchy_type VARCHAR(32), -- store/product
  hierarchy_name VARCHAR(64),
  column_name VARCHAR(64),
  label VARCHAR(64)
);

CREATE TABLE screens (
  id SERIAL PRIMARY KEY,
  screen_name VARCHAR(64)
);

CREATE TABLE filters (
  id SERIAL PRIMARY KEY,
  filter_name VARCHAR(64)
);

-- JSONB module configuration
CREATE TABLE config_modules (
  config_id SERIAL PRIMARY KEY,
  screen_name VARCHAR(64),
  module_name VARCHAR(64),
  module_config JSONB
);
