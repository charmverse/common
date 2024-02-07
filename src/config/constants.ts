// Note: NODE_ENV can only be 'development' or 'production' according to Next.js, but we don't want to mix them with test env
export const isTestEnv = process.env.NEXT_PUBLIC_APP_ENV === 'test' || process.env.NODE_ENV === 'test';
export const isStagingEnv = process.env.NEXT_PUBLIC_APP_ENV === 'staging';
export const isDevEnv = process.env.NODE_ENV === 'development' && !isTestEnv && !isStagingEnv;
export const isProdEnv = process.env.NODE_ENV === 'production' && !isTestEnv && !isStagingEnv;
export const isNodeEnv = typeof window === 'undefined';
export const appEnv = isProdEnv ? 'production' : isStagingEnv ? 'staging' : isTestEnv ? 'test' : 'development';
export const baseUrl = process.env.DOMAIN as string | undefined;
// Google config
export const googleOAuthClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
export const googleOAuthClientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
// Google client
// To retrieve these values, go to Firebase, then project settings, and retrieve the JSON for the web client. You can then assign the values for each key in the client secrets area.
export const googleWebClientConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_GOOGLE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID
};

// Google config with sensitive scopes (to eventually replace the primary config)
export const googleOAuthClientIdSensitive =
  process.env.GOOGLE_OAUTH_CLIENT_ID_SENSITIVE || process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID_SENSITIVE;
export const googleOAuthClientSecretSensitive = process.env.GOOGLE_OAUTH_CLIENT_SECRET_SENSITIVE;
