import * as awilix from 'awilix';
import services from './services';
import controllers from './controllers';

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});

container.register({
    ...services,
    ...controllers
});

export default container;