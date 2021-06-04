const aliases = (prefix = 'src') => ({
  '@components': `${prefix}/components/`,
  '@containers': `${prefix}/components/containers`,
  '@common': `${prefix}/components/common/`,
  '@hooks': `${prefix}/hooks/`,
  '@utils': `${prefix}/utils/`,
  '@services': `${prefix}/services/`,
});

module.exports = aliases;
