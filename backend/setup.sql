-- Run this SQL to set up PostgreSQL tables for the Configurator backend

CREATE TABLE IF NOT EXISTS hierarchies (
  id SERIAL PRIMARY KEY,
  hierarchy_type VARCHAR(32), -- store/product
  hierarchy_name VARCHAR(64),
  column_name VARCHAR(64),
  label VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS screens (
  id SERIAL PRIMARY KEY,
  screen_name VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS filters (
  id SERIAL PRIMARY KEY,
  filter_name VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS config_modules (
  config_id SERIAL PRIMARY KEY,
  screen_name VARCHAR(64),
  module_name VARCHAR(64),
  module_config JSONB
);
