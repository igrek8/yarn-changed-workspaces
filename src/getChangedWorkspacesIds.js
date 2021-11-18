const _ = require("lodash");

const { getChangedWorkspaces } = require("./getChangedWorkspaces");

const getChangedWorkspacesIds = async ({
  namespace,
  keyNaming,
  projectRoot,
  fromBranch,
  branch,
}) => {
  const result = {};
  const formatName = (str) => (keyNaming ? _[keyNaming](str) : str);
  const normalizeName = (str) => (namespace ? str.replace(namespace, "") : str);
  const workspaces = await getChangedWorkspaces({ fromBranch, branch, projectRoot });
  Object.entries(workspaces).map(([id, files]) => {
    if (files.length <= 0) return;
    result[formatName(normalizeName(id))] = files;
  });
  return result;
};

module.exports.getChangedWorkspacesIds = getChangedWorkspacesIds;
