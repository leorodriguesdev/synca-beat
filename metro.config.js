const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adiciona suporte ao NativeWind
config.resolver.sourceExts.push('css');

module.exports = config; 