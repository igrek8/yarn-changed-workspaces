const _ = require("lodash");

const { getChangedWorkspaces } = require("./getChangedWorkspaces");

const getChangedWorkspacesIds = async ({
  namespace,
  keyNaming,
  projectRoot,
  branch,
}) => {
  const formatName = (str) => (keyNaming ? _[keyNaming](str) : str);
  const normalizeName = (str) => (namespace ? str.replace(namespace, "") : str);
  const workspaces = await getChangedWorkspaces({ branch, projectRoot });
  return Object.entries(workspaces).reduce((obj, [id, files]) => {
    if (files.length <= 0) return obj;
    return { ...obj, [formatName(normalizeName(id))]: files };
  }, {});
};

module.exports.getChangedWorkspacesIds = getChangedWorkspacesIds;
