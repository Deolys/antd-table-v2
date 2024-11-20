const AVAILABLE_KEYS = ['antd-table-v2_SECRET_KEY'];

const checkProjectKey = (req, res, next) => {
  const projectKey = req.headers.projectkey;

  if (projectKey && AVAILABLE_KEYS.includes(projectKey)) {
    next();
  } else {
    return res.status(403).json({
      message: 'Invalid project key',
    });
  }
};

module.exports = checkProjectKey;
