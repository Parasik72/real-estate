import getConfig from "next/config";
import * as path from "path";

export const STATIC_PATH = path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, process.env.STATIC_PATH);
export const PROPERTY_IMGS_PATH = path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, process.env.PROPERTY_IMGS_PATH);