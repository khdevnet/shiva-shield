const os = require('os');
const executeCommand = require('child_process').execSync;

const getConf = require('./config-loader');


module.exports = function () {
  const pattern = getConf(process.cwd()).branchname;
  const branchName = getCurrentBranchName();

  if (!branchName.match(pattern)) {
    throw new Error(`${os.EOL} Branch name is not allowed by pattern ${pattern}.${os.EOL} Branch name: ${branchName}`);
  }

  function getCurrentBranchName() {
    const branchName = executeCommand('git rev-parse --abbrev-ref HEAD');

    if (!branchName) {
      throw new Error('Unable to determine branch name using git command.');
    }

    return branchName.toString();
  }
};
