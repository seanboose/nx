import type { Tree } from '@nrwl/devkit';
import { generateFiles, joinPathFragments } from '@nrwl/devkit';
import type { Schema } from '../schema';

export function addEntryModule(
  host: Tree,
  { appName, routing, mfType, prefix }: Schema,
  appRoot: string
) {
  if (mfType === 'remote') {
    generateFiles(
      host,
      joinPathFragments(__dirname, '../files/entry-module-files'),
      `${appRoot}/src/app/remote-entry`,
      {
        tmpl: '',
        appName,
        routing,
        prefix,
      }
    );

    host.write(
      `${appRoot}/src/app/app.module.ts`,
      `/* 
      * This RemoteEntryModule is imported here to allow TS to find the Module during 
      * compilation, allowing it to be included in the built bundle. This is required 
      * for the Module Federation Plugin to expose the Module correctly.
      * */
      import { RemoteEntryModule } from './remote-entry/entry.module';
${host.read(`${appRoot}/src/app/app.module.ts`, 'utf-8')}`
    );
  }
}
