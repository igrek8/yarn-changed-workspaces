const { filterWorkspaces } = require("./filterWorkspaces");

const getTouchedDependencies = ({ workspaces, files }) => {
  return Object.values(workspaces).reduce((changed, wa) => {
    const _files = filterWorkspaces({ workspace: wa, files });
    changed[wa.id] = changed[wa.id] || [];
    changed[wa.id] = changed[wa.id].concat(_files);
    if (_files.length <= 0) return changed;
    Object.values(workspaces).forEach((wb) => {
      if (wa === wb) return;
      if (!wb.dependencies.includes(wa.id)) return;
      changed[wb.id] = changed[wb.id] || [];
      changed[wb.id] = changed[wb.id].concat(wa.path);
    });
    return changed;
  }, {});
};

exports.getTouchedDependencies = getTouchedDependencies;
