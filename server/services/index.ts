import type { UserService } from './user.service';
import type { PropertyService } from './property.service';
import type { FileUploaderService } from './file-uploader.service';
import type { DealService } from './deal.service';
import { ApiContainerKeys } from '../contaier.keys';

export interface IServiceContainer {
    [ApiContainerKeys.UserService]: UserService;
    [ApiContainerKeys.PropertyService]: PropertyService;
    [ApiContainerKeys.FileUploaderService]: FileUploaderService;
    [ApiContainerKeys.DealService]: DealService;
}