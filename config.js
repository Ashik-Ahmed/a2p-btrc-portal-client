import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
export const AUTH_URL = publicRuntimeConfig.AUTH_URL;
export const API_SERVER_URL = publicRuntimeConfig.API_SERVER_URL;
