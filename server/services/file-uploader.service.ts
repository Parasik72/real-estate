import { v4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import BaseContext from '../context/base-context';
import INJECTABLE from '../decorators/injectable.decorator';

@INJECTABLE()
export class FileUploaderService extends BaseContext {
  uploadFile(file: Express.Multer.File, dirPath: string): string {
    const fileName = this.generateFileName(file,);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, {recursive: true});
    }
    fs.writeFileSync(path.resolve(dirPath, fileName), file.buffer);
    return fileName;
  }

  deleteFile(fileName: string, dirPath: string): string | null {
    const fullPath = path.resolve(dirPath, fileName);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    fs.unlinkSync(fullPath);
    return fileName;
  }

  private generateFileName(file: Express.Multer.File): string {
    const extension = file.mimetype.split('/').pop();
    const fileName = v4();
    return `${fileName}.${extension}`;
  }
}