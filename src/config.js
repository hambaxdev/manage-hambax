/**
 * Configuration file that loads environment variables based on NODE_ENV
 * 
 * This file automatically selects the right configuration based on the current environment mode:
 * - In development mode: Uses variables from .env.development
 * - In production mode: Uses variables from .env.production
 * - In other cases: Falls back to the default .env file
 */

// Get the current environment
const environment = process.env.NODE_ENV || 'development';

// Log the current environment for debugging purposes
console.log(`Running in ${environment} mode`);

// Export configuration based on environment
const config = {
  // API URLs
  apiUrl: process.env.REACT_APP_API_URL,
  hambaxNewApiUrl: process.env.REACT_APP_HAMBAX_NEW_API_URL,
  // Environment information
  environment,
  isDevelopment: environment === 'development',
  isProduction: environment === 'production',
  isTest: environment === 'test',
};

export default config;