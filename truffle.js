module.exports = {
  networks: {
    contracts_build_directory: "./build",
    development: {
      host: "127.0.0.1",
      gas: 8000000,
      port: 9545,
      network_id: "*" // Match any network id
    }
  }
};
