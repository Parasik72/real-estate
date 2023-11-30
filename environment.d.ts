namespace NodeJS {
  interface ProcessEnv {
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOSTNAME: string;
    BACKEND_URL: string;
  }
}
namespace Express {
  interface User {
    userId: any;
  }
}