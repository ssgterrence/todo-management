export const env = {
  apiUrl: import.meta.env.VITE_API_URL,
  get apiEndpoint() {
    if (!this.apiUrl) {
      throw new Error("API_URL is not defined in environment variables");
    }
    return this.apiUrl;
  },
};
