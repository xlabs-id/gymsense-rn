export type GymSenseEnv = 'development' | 'staging' | 'production';

export const GYMSENSE_URLS: Record<GymSenseEnv, string> = {
  development: 'https://mac.xlabs.local',
  staging: 'https://staging.gymsense.movaja.id',
  production: 'https://gymsense.movaja.id',
};
