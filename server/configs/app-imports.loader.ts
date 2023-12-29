import { sync } from 'glob';
import path from 'path';
import getConfig from "next/config";
import { BuildResolver, DisposableResolver, asClass } from 'awilix';

interface ContainerItems {
    [key: string]: BuildResolver<Object> & DisposableResolver<Object>;
}

export class AppImportsLoader {
    static async load(pattern: string | string[]) {
        const filePaths = sync(pattern);
        let result: ContainerItems = {};
        for await (const filePath of filePaths) {
            try {
                const resolvedFilePath = path.relative(getConfig().serverRuntimeConfig.API_ROOT, filePath);
                const importFile = await import(`../${resolvedFilePath}`);
                Object.keys(importFile).forEach((importFileKey) => {
                    if (typeof importFile[importFileKey] === 'function') {
                        const metadata = Reflect.getMetadata(importFile[importFileKey].name, importFile[importFileKey]);
                        if (!metadata?.CONTROLLER) return;
                        result = {
                            ...result,
                            [importFile[importFileKey].name]: asClass(importFile[importFileKey]).singleton() 
                        }
                    }
                });
            } catch (error) {
                console.log(`AppImportsLoader error: ${error}`)
            }
        }
        return result;
    }
}