import { asClass } from 'awilix';
import { UserService } from './user.service';
import { PropertyService } from './property.service';

export default {
    userService: asClass(UserService).singleton(),
    propertyService: asClass(PropertyService).singleton()
}