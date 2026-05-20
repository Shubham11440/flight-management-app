import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  turbopack: {},
};

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^https?:\/\/.*\/api\/flights\/search/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "flight-search-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // 1 hour
        },
      },
    },
    {
      urlPattern: /^https?:\/\/.*\/_next\/static\/.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets-cache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
    {
      urlPattern: /^https?:\/\/.*\/_next\/image\?.*/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "next-image-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
        },
      },
    },
    {
      urlPattern: /^https?:\/\/.*\/my-bookings/,
      handler: "NetworkFirst",
      options: {
        cacheName: "bookings-cache",
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 * 24, // 24 hours
        },
      },
    },
  ],
});

export default pwaConfig(nextConfig);
