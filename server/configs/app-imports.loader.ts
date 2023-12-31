import { sync } from 'glob';
import path from 'path';
import getConfig from "next/config";
import { BuildResolver, DisposableResolver, asClass } from 'awilix';

interface ContainerItems {
    [key: string]: BuildResolver<Object> & DisposableResolver<Object>;
}

export class AppImportsLoader {
    static async load(pattern: string | string[]): Promise<ContainerItems> {
        const filePaths = sync(pattern);
        let result: ContainerItems = {};
        for (const filePath of filePaths) {
            try {
                const resolvedFilePath = path.relative(getConfig().serverRuntimeConfig.API_ROOT, filePath).replace(/\\/g, '/');
                const importFile = await import(`../${resolvedFilePath}`);
                Object.keys(importFile).forEach((importFileKey) => {
                    if (typeof importFile[importFileKey] === 'function') {
                        const metadata = Reflect.getMetadata(importFile[importFileKey].name, importFile[importFileKey]);
                        if (!metadata?.isInjectable) return;
                        result[importFile[importFileKey].name] = asClass(importFile[importFileKey]).singleton();
                    }
                });
            } catch (error) {
                console.log(`AppImportsLoader error: ${error}`)
            }
        }
        return result;
    }
}