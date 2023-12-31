import { AppImportsLoader } from "./app-imports.loader";

export default await AppImportsLoader.load([
    'server/controllers/*.ts'
]);