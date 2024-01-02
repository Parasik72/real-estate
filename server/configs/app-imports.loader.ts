import { sync } from 'glob';
import path from 'path';
import getConfig from "next/config";
import { BuildResolver, DisposableResolver, asClass, asFunction } from 'awilix';
import * as awilix from 'awilix';

interface ContainerItems {
    [key: string]: BuildResolver<any> & DisposableResolver<any>;
}

interface LoadData {
    containerData: ContainerItems;
    associations: (container: awilix.AwilixContainer<any>) => void;
}

const DEFINE_MODEL_KEY = 'defineModel';
const DEFINE_ASSOCIATIONS_KEY = 'defineAssociations';

export class AppImportsLoader {
    static async load(pattern: string | string[]): Promise<LoadData> {
        const filePaths = sync(pattern);
        let result: ContainerItems = {};
        const associationsArr: Function[] = [];
        for (const filePath of filePaths) {
            try {
                const resolvedFilePath = path.relative(getConfig().serverRuntimeConfig.API_ROOT, filePath).replace(/\\/g, '/');
                const importFile = await import(`../${resolvedFilePath}`);
                Object.keys(importFile).forEach((importFileKey) => {
                    if (typeof importFile[importFileKey] === 'function') {
                        let instanceKey;
                        let instanceValue;
                        if (importFileKey === DEFINE_ASSOCIATIONS_KEY) {
                            associationsArr.push(importFile[importFileKey]);
                        }
                        if (importFileKey === DEFINE_MODEL_KEY) {
                            const { name: fileName } = path.parse(filePath);
                            instanceKey = fileName;
                            instanceValue = asFunction(importFile[importFileKey]).singleton();
                        } else {
                            const metadata = Reflect.getMetadata(importFile[importFileKey].name, importFile[importFileKey]);
                            if (!metadata?.isInjectable) return;
                            instanceValue = asClass(importFile[importFileKey]).singleton();
                            instanceKey = importFile[importFileKey].name;
                        }
                        result[instanceKey] = instanceValue;
                    }
                });
            } catch (error) {
                console.log(`AppImportsLoader container error: ${error}`)
            }
        }
        return {
            containerData: result,
            associations: (container) => {
                try {
                    let ctx: any = {};
                    Object.keys(container.registrations).forEach((containerKey) => {
                        ctx[containerKey] = container.resolve(containerKey);
                    });
                    associationsArr.forEach((func) => func(ctx));
                } catch (error) {
                    console.log(`AppImportsLoader associations error: ${error}`)
                }
            }
        };
    }
}