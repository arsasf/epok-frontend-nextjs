module.exports = {
  env: {
    APP_NAME: "Z-Wallet",
    BASE_URL: "http://localhost:3004/backend4/api/v1/",
  },
  async rewrites() {
    return [
      {
        source: "/login", // source = pengganti path
        destination: "/auth/login", // destination = lokai path
      },
    ];
  },
};
