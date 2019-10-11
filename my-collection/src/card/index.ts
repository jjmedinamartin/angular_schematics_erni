import {
  apply, filter,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url
} from '@angular-devkit/schematics';
import { normalize } from 'path';
import {getWorkspace} from "@schematics/angular/utility/config";
import {parseName} from "@schematics/angular/utility/parse-name";
import {buildDefaultPath} from "@schematics/angular/utility/project";
import {strings} from "@angular-devkit/core";
export function setupOptions(host: Tree, options: any): Tree {
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }
  const project = workspace.projects[options.project];

  if (options.path === undefined) {
    options.path = buildDefaultPath(project);
  }

  const parsedPath = parseName(options.path, options.name);
  options.name = parsedPath.name + '-card';
  options.path = parsedPath.path;
  return host;
}
export function init(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, options);

    const movePath = normalize(options.path + '/' + strings.dasherize(options.name));

    const templateSource = apply(url('./files'), [
      filter(path => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options,
      }),
      move(movePath),
    ]);

    const rule = mergeWith(templateSource, MergeStrategy.Default);
    return rule(tree, _context);
  };
}
