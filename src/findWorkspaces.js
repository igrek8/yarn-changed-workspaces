const { join } = require("path");
const { promises: fs } = require("fs");
const { readJSONFile } = require("./readJSONFile");
const { promisify } = require("util");

const _glob = require("glob");
const glob = promisify(_glob);

const findWorkspaces = async ({ rootPath, pattern }) => {
  const globPath = join(rootPath, pattern);
  const matched = await glob(globPath);
  return matched.reduce(async (promise, path) => {
    const items = await promise;
    const stat = await fs.stat(path);
    if (stat.isDirectory()) {
      const pkgPath = join(path, "package.json");
      const pkg = await readJSONFile(pkgPath);
      items.push({
        id: pkg.name,
        path,
        config: pkg.workspace,
        dependencies: Object.keys({
          ...pkg.dependencies,
          ...pkg.devDependencies,
          ...pkg.peerDependencies,
          ...pkg.bundledDependencies,
          ...pkg.optionalDependencies,
        }),
      });
    }
    return items;
  }, Promise.resolve([]));
};
exports.findWorkspaces = findWorkspaces;
