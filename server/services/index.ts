import { asClass } from 'awilix';
import { UserService } from './user.service';
import { PropertyService } from './property.service';
import { FileUploaderService } from './file-uploader.service';
import { DealService } from './deal.service';

export interface IServiceContainer {
    userService: UserService;
    propertyService: PropertyService;
    fileUploaderService: FileUploaderService;
    dealService: DealService;
}

export default {
    userService: asClass(UserService).singleton(),
    propertyService: asClass(PropertyService).singleton(),
    fileUploaderService: asClass(FileUploaderService).singleton(),
    dealService: asClass(DealService).singleton()
}