

/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa"); 

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    //disable: false,
    disable: process.env.NODE_ENV === 'development',
   // sw: '/sw.js',
  },
  reactStrictMode: true,
  images: {
    domains: ['demomagento.com','pwastudiodemomagento.com', 'integration-5ojmyuq-23txbi6folvo6.ap-3.magentosite.cloud'],
  },
  experimental: {
    images: {
        unoptimized: true
    }
}
}) 