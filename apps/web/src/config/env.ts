interface Environment {
  API_URL: string;
  NOTIFICATIONS_WS_URL: string;
}

export const env: Environment = {
  API_URL: import.meta.env.VITE_API_URL!,
  NOTIFICATIONS_WS_URL: import.meta.env.VITE_NOTIFICATIONS_WS_URL!,
};
