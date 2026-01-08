interface Environment {
  API_URL: string;
  NOTIFICATIONS_SERVICE_BASE_URL: string;
}

export const env: Environment = {
  API_URL: import.meta.env.VITE_API_URL!,
  NOTIFICATIONS_SERVICE_BASE_URL: import.meta.env
    .VITE_NOTIFICATIONS_SERVICE_BASE_URL!,
};
