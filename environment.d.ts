namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOSTNAME: string;
    STATIC_PATH: string;
    PROPERTY_IMGS_PATH: string;
  }
}
namespace Express {
  interface User {
    userId: any;
  }
}