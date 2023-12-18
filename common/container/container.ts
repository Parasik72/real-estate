import * as awilix from 'awilix';
import services from '../services'; 
import { ReduxStore } from '../store/redux.store';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    ...services,
    reduxStore: awilix.asClass(ReduxStore).singleton()
});

export default container;