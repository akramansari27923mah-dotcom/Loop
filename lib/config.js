const getEnv = (key) => {
  const value = process.env[key];

  if (!value) throw new Error(`${key} is not found!`);

  return value;
};

export const config = {
  MONGODB_URI: getEnv("MONGODB_URI"),
  MONGODB_DB: getEnv("MONGODB_DB"),
  BETTER_AUTH_SECRET: getEnv("BETTER_AUTH_SECRET"),
  BETTER_AUTH_URL: getEnv("BETTER_AUTH_URL"),
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  BETTER_AUTH_URL: getEnv("BETTER_AUTH_URL"),
  GITHUB_CLIENT_ID: getEnv("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: getEnv("GITHUB_CLIENT_SECRET"),
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
};
