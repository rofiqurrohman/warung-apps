const CONFIG = {
  KEY: '12345',
  BASE_IMAGE_URL: (size) => `https://restaurant-api.dicoding.dev/images/${size}/`,
  BASE_URL: 'https://restaurant-api.dicoding.dev',
  CACHE_NAME: `WarungApps-${Math.random().toString(36).substring(2, 5)}`,
  DATABASE_NAME: 'warung-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'warung',
};

export default CONFIG;
