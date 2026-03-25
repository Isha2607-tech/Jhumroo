import React, { useMemo, useState } from 'react';
import { useAdminConfig } from '../../../context/AdminConfigContext';
import { getDefaultAdminConfig } from '../../../data/adminDefaultConfig';

const AdminSettings = () => {
  const { config, setConfig, resetConfig } = useAdminConfig();
  const [configDraft, setConfigDraft] = useState(() => JSON.stringify(config, null, 2));
  const [error, setError] = useState('');

  const branding = config?.branding || {};
  const palette = branding.palette || {};

  const handleBrandingChange = (field, value) => {
    setConfig((currentConfig) => ({
      ...currentConfig,
      branding: {
        ...currentConfig.branding,
        [field]: value,
      },
    }));
  };

  const handlePaletteChange = (field, value) => {
    setConfig((currentConfig) => ({
      ...currentConfig,
      branding: {
        ...currentConfig.branding,
        palette: {
          ...currentConfig.branding?.palette,
          [field]: value,
        },
      },
    }));
  };

  const handleFeatureToggle = (field) => {
    setConfig((currentConfig) => ({
      ...currentConfig,
      features: {
        ...currentConfig.features,
        [field]: !currentConfig.features?.[field],
      },
    }));
  };

  const handleExportRefresh = () => {
    setConfigDraft(JSON.stringify(config, null, 2));
    setError('');
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(configDraft);
      setConfig(parsed);
      setError('');
    } catch {
      setError('Invalid JSON. Please check before importing.');
    }
  };

  const featureList = useMemo(
    () => [
      { id: 'enableTrending', label: 'Trending sections' },
      { id: 'enableAdminAnalytics', label: 'Admin analytics widgets' },
    ],
    [],
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Settings</h1>
          <p>Centralize branding, theme, and feature toggles.</p>
        </div>
        <button type="button" className="admin-secondary-btn" onClick={resetConfig}>
          Reset to defaults
        </button>
      </div>

      <div className="admin-columns">
        <div className="admin-card admin-column">
          <div className="admin-card-header">
            <h2>Branding</h2>
            <p>Update logo, app name, and signature palette.</p>
          </div>
          <div className="admin-form-grid">
            <label>
              App name
              <input
                value={branding.appName || ''}
                onChange={(event) => handleBrandingChange('appName', event.target.value)}
              />
            </label>
            <label>
              Logo URL
              <input
                value={branding.logo || ''}
                onChange={(event) => handleBrandingChange('logo', event.target.value)}
              />
            </label>
          </div>
          <div className="admin-color-grid">
            {[
              { id: 'primary', label: 'Primary', value: palette.primary },
              { id: 'secondary', label: 'Secondary', value: palette.secondary },
              { id: 'accent', label: 'Accent', value: palette.accent },
              { id: 'ink', label: 'Ink', value: palette.ink },
              { id: 'surface', label: 'Surface', value: palette.surface },
              { id: 'muted', label: 'Muted', value: palette.muted },
            ].map((item) => (
              <label key={item.id} className="admin-color-field">
                <span>{item.label}</span>
                <input
                  type="color"
                  value={item.value || '#ffffff'}
                  onChange={(event) => handlePaletteChange(item.id, event.target.value)}
                />
                <input
                  type="text"
                  value={item.value || ''}
                  onChange={(event) => handlePaletteChange(item.id, event.target.value)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="admin-card admin-column">
          <div className="admin-card-header">
            <h2>Feature toggles</h2>
            <p>Enable or disable admin-facing modules.</p>
          </div>
          <div className="admin-toggle-list">
            {featureList.map((feature) => (
              <button
                key={feature.id}
                type="button"
                className={`admin-toggle ${config?.features?.[feature.id] ? 'active' : ''}`}
                onClick={() => handleFeatureToggle(feature.id)}
              >
                <span>{feature.label}</span>
                <span className="admin-toggle-pill">
                  {config?.features?.[feature.id] ? 'On' : 'Off'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-card admin-json-export">
        <div className="admin-card-header">
          <div>
            <h2>Import / Export</h2>
            <p>Copy configuration JSON to share across environments.</p>
          </div>
          <div className="admin-card-actions">
            <button type="button" className="admin-secondary-btn" onClick={handleExportRefresh}>
              Refresh JSON
            </button>
            <button type="button" className="admin-primary-btn" onClick={handleImport}>
              Import JSON
            </button>
          </div>
        </div>
        <textarea value={configDraft} onChange={(event) => setConfigDraft(event.target.value)} rows={12} />
        {error && <p className="admin-error">{error}</p>}
        <p className="admin-note">
          Tip: You can restore defaults by importing the baseline config from <code>getDefaultAdminConfig()</code>.
        </p>
        <pre className="admin-default-preview">
          {JSON.stringify(getDefaultAdminConfig().branding, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default AdminSettings;
