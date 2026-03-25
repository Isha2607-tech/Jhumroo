import { getDefaultAdminConfig } from '../data/adminDefaultConfig';

const ADMIN_CONFIG_KEY = 'adminConfig';
const ADMIN_CONFIG_EVENT = 'adminConfigUpdated';
const LEGACY_PURPLE_PALETTE = {
  primary: '#5b2b88',
  secondary: '#2bc4d5',
  accent: '#f28c3a',
  ink: '#1d1533',
  surface: '#ffffff',
  muted: '#f1ecfb',
};
const LIGHT_RED_PALETTE = {
  primary: '#fe2c55',
  secondary: '#ff7b93',
  accent: '#ffb4c1',
  ink: '#2a1117',
  surface: '#ffffff',
  muted: '#a16976',
};

const isObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const mergeDefaults = (defaults, stored) => {
  if (Array.isArray(defaults)) {
    return Array.isArray(stored) ? stored : defaults;
  }

  if (isObject(defaults)) {
    const result = { ...defaults };
    if (isObject(stored)) {
      Object.keys(stored).forEach((key) => {
        result[key] = mergeDefaults(defaults[key], stored[key]);
      });
    }
    return result;
  }

  return stored !== undefined ? stored : defaults;
};

const normalizeHex = (value) => (typeof value === 'string' ? value.toLowerCase() : '');

const isLegacyPalette = (palette = {}) =>
  Object.entries(LEGACY_PURPLE_PALETTE).every(
    ([key, value]) => normalizeHex(palette?.[key]) === value,
  );

const normalizeBrandingPalette = (config = {}) => {
  const palette = config?.branding?.palette;
  if (!palette || !isLegacyPalette(palette)) {
    return config;
  }

  return {
    ...config,
    branding: {
      ...config.branding,
      palette: {
        ...palette,
        ...LIGHT_RED_PALETTE,
      },
    },
  };
};

export const readAdminConfig = () => {
  const defaults = getDefaultAdminConfig();
  try {
    const storedValue = localStorage.getItem(ADMIN_CONFIG_KEY);
    if (!storedValue) {
      return defaults;
    }

    const parsedValue = JSON.parse(storedValue);
    if (!parsedValue || typeof parsedValue !== 'object') {
      return defaults;
    }

    return normalizeBrandingPalette(mergeDefaults(defaults, parsedValue));
  } catch {
    return defaults;
  }
};

export const writeAdminConfig = (config) => {
  localStorage.setItem(ADMIN_CONFIG_KEY, JSON.stringify(config));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(ADMIN_CONFIG_EVENT, { detail: config }));
  }
};

export const resetAdminConfig = () => {
  const defaults = getDefaultAdminConfig();
  writeAdminConfig(defaults);
  return defaults;
};

export const onAdminConfigUpdate = (handler) => {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const listener = (event) => {
    handler(event.detail);
  };

  window.addEventListener(ADMIN_CONFIG_EVENT, listener);
  return () => window.removeEventListener(ADMIN_CONFIG_EVENT, listener);
};

export const getAdminConfigKey = () => ADMIN_CONFIG_KEY;
