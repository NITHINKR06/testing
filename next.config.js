const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing config options (if any)...

  // Add this to silence the multiple lockfile warning
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
