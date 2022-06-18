export const environment = {
  isProduction: true,
  application: {
    baseUrl: process.env.REACT_APP_BASE_URL as string,
    imageBaseUrl: process.env.REACT_APP_IMAGE_BASE_URL as string,
  },
};