module.exports = {
  branches: ['master'],
  verifyConditions: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
  ],
  prepare: [
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git',
  ],
}
