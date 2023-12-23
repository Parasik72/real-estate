import * as awilix from 'awilix';
import models from '@/db/models/model-container';
import services from './services';
import controllers from './controllers';
import { dbInstance } from '@/db/db-instance';
import { ApiContainerKeys } from './contaier.keys';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    ...models,
    ...services,
    ...controllers,
    [ApiContainerKeys.DBInstance]: awilix.asValue(dbInstance)
});

export default container;