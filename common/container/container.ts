import * as awilix from 'awilix';
import services from '../services'; 
import { ReduxStore } from '../store/redux.store';
import { ContainerKeys } from './container.keys';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    ...services,
    [ContainerKeys.ReduxStore]: awilix.asClass(ReduxStore).singleton()
});

export default container;