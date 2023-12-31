import * as awilix from 'awilix';
import models from '@/db/models/model-container';
import { dbInstance } from '@/db/db-instance';
import { ApiContainerKeys } from './contaier.keys';
import { AppImportsLoader } from './configs/app-imports.loader';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

const result = await AppImportsLoader.load([
    'server/controllers/*.ts',
    'server/services/*.ts',
]);

container.register({
    ...models,
    ...result,
    [ApiContainerKeys.DBInstance]: awilix.asValue(dbInstance),
});

export default container;