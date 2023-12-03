import { asClass } from 'awilix';
import { UserService } from './user.service';
import { PropertyService } from './property.service';
import { FileUploaderService } from './file-uploader.service';

export default {
    userService: asClass(UserService).singleton(),
    propertyService: asClass(PropertyService).singleton(),
    fileUploaderService: asClass(FileUploaderService).singleton()
}