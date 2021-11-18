const { getTouchedFiles } = require("./getTouchedFiles");
const { getTrackedFiles } = require("./getTrackedFiles");

const getChangedFiles = async ({ fromBranch, branch, cwd } = {}) => {
  const [touchedFiles, trackedFiles] = await Promise.all([
    getTouchedFiles({ fromBranch, cwd, branch }),
    getTrackedFiles({ cwd }),
  ]);
  return [...new Set([...touchedFiles, ...trackedFiles])];
};

exports.getChangedFiles = getChangedFiles;
