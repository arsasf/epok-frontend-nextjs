module.exports = {
  env: {
    APP_NAME: "Z-Wallet",
    BASE_URL: "http://localhost:3004/backend4/api/v1/",
  },
  images: {
    domains: ["http://localhost:3004/backend4/api/"],
  },
  async rewrites() {
    return [
      {
        source: "/login", // source = pengganti path
        destination: "/auth/login", // destination = lokai path
      },
      {
        source: "/signin", // source = pengganti path
        destination: "/auth/signin", // destination = lokai path
      },
      {
        source: "/signup", // source = pengganti path
        destination: "/auth/signup", // destination = lokai path
      },
      {
        source: "/pin", // source = pengganti path
        destination: "/auth/pin", // destination = lokai path
      },
    ];
  },
};
