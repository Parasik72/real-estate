import { asClass } from 'awilix';
import { UserService } from './user.service';
import { PropertyService } from './property.service';
import { FileUploaderService } from './file-uploader.service';
import { DealService } from './deal.service';
import { ApiContainerKeys } from '../contaier.keys';

export interface IServiceContainer {
    [ApiContainerKeys.UserService]: UserService;
    [ApiContainerKeys.PropertyService]: PropertyService;
    [ApiContainerKeys.FileUploaderService]: FileUploaderService;
    [ApiContainerKeys.DealService]: DealService;
}

export default {
    [ApiContainerKeys.UserService]: asClass(UserService).singleton(),
    [ApiContainerKeys.PropertyService]: asClass(PropertyService).singleton(),
    [ApiContainerKeys.FileUploaderService]: asClass(FileUploaderService).singleton(),
    [ApiContainerKeys.DealService]: asClass(DealService).singleton()
}