function getEnvVar(name) {
  return process.env[name] || ""
}
export default {
  environment: getEnvVar("TEST"),
  http: {
    port: getEnvVar("HTTP_PORT"),
  },
  https: {
    port: getEnvVar("HTTPS_PORT"),
  },
  mysql: {
    connectionLimit: getEnvVar("MYSQL_CONNECTION_LIMIT"),
    host: getEnvVar("MYSQL_HOST"),
    user: getEnvVar("MYSQL_USER"),
    password: getEnvVar("MYSQL_PASSWORD"),
    database: getEnvVar("MYSQL_DATABASE"),
  },
  crypto: {
    aes_password: getEnvVar("CRYPTO_AES_PASSWORD"),
    aes_iv: getEnvVar("CRYPTO_AES_IV"),
  }
};
