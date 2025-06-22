import '@testing-library/jest-native/extend-expect';

// Mock básico do react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock básico do expo-av
jest.mock('expo-av', () => ({
  Audio: {
    Sound: jest.fn().mockImplementation(() => ({
      loadAsync: jest.fn(),
      playAsync: jest.fn(),
      pauseAsync: jest.fn(),
      stopAsync: jest.fn(),
      setPositionAsync: jest.fn(),
      setVolumeAsync: jest.fn(),
      getStatusAsync: jest.fn(),
      unloadAsync: jest.fn(),
    })),
    setAudioModeAsync: jest.fn(),
  },
}));

// Mock básico do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('light')),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock básico do react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
}));

// Mock básico do expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useGlobalSearchParams: () => ({}),
  Link: 'Link',
  Stack: {
    Screen: 'Stack.Screen',
  },
}));

// Mock básico do expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Mock básico do expo-splash-screen
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

// Mock básico do expo-font
jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true]),
}));

// Configuração global para testes
global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Mock do fetch
global.fetch = jest.fn();

// Mock do setTimeout e setInterval
jest.useFakeTimers();

// Cleanup após cada teste
afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
}); 