const { resolve } = require("path");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const getTouchedFiles = async ({ fromBranch, branch, cwd }) => {
  const cmd = fromBranch
    ? `git diff --name-only ${fromBranch}..${branch}`
    : `git diff --name-only ${branch}`;
  const { stdout, stderr } = await exec(cmd, { cwd });
  if (stderr) throw new Error(stderr);
  return stdout
    .split("\n")
    .filter(Boolean)
    .map((changedFilePath) => resolve(cwd, changedFilePath));
};

exports.getTouchedFiles = getTouchedFiles;
