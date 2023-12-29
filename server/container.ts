import * as awilix from 'awilix';
import models from '@/db/models/model-container';
import services from './services';
import controllers from './controllers';
import { dbInstance } from '@/db/db-instance';
import { ApiContainerKeys } from './contaier.keys';
import { AppImportsLoader } from './configs/app-imports.loader';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

const result = await AppImportsLoader.load([
    'server/controllers/test.controller.ts'
]);

container.register({
    ...models,
    ...services,
    ...controllers,
    ...result,
    [ApiContainerKeys.DBInstance]: awilix.asValue(dbInstance),
});

export default container;