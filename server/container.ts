import * as awilix from 'awilix';
import { dbInstance } from '@/server/db/db-instance';
import { ApiContainerKeys } from './contaier.keys';
import { AppImportsLoader } from './configs/app-imports.loader';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

const {
    containerData,
    associations
} = await AppImportsLoader.load([
    'server/controllers/*.ts',
    'server/services/*.ts',
    'server/db/models/*.ts',
]);

container.register({
    ...containerData,
    [ApiContainerKeys.DBInstance]: awilix.asValue(dbInstance),
});

associations(container);

export default container;