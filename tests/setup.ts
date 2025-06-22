import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// Mock do react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock do expo-av
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

// Mock do react-native-ble-plx
jest.mock('react-native-ble-plx', () => ({
  BleManager: jest.fn().mockImplementation(() => ({
    startDeviceScan: jest.fn(),
    stopDeviceScan: jest.fn(),
    connectToDevice: jest.fn(),
    cancelDeviceConnection: jest.fn(),
    discoverAllServicesAndCharacteristicsForDevice: jest.fn(),
    readCharacteristicForDevice: jest.fn(),
    writeCharacteristicForDevice: jest.fn(),
    monitorCharacteristicForDevice: jest.fn(),
    cancelTransaction: jest.fn(),
  })),
  State: {
    PoweredOn: 'PoweredOn',
    PoweredOff: 'PoweredOff',
    Unsupported: 'Unsupported',
    Unauthorized: 'Unauthorized',
    Resetting: 'Resetting',
    Unknown: 'Unknown',
  },
}));

// Mock do expo-permissions
jest.mock('expo-permissions', () => ({
  requestAsync: jest.fn(),
  getAsync: jest.fn(),
}));

// Mock do expo-file-system
jest.mock('expo-file-system', () => ({
  documentDirectory: '/mock/document/directory/',
  cacheDirectory: '/mock/cache/directory/',
  readAsStringAsync: jest.fn(),
  writeAsStringAsync: jest.fn(),
  deleteAsync: jest.fn(),
  moveAsync: jest.fn(),
  copyAsync: jest.fn(),
  makeDirectoryAsync: jest.fn(),
  readDirectoryAsync: jest.fn(),
  getInfoAsync: jest.fn(),
}));

// Mock do expo-media-library
jest.mock('expo-media-library', () => ({
  requestPermissionsAsync: jest.fn(),
  getPermissionsAsync: jest.fn(),
  getAssetsAsync: jest.fn(),
  getAssetInfoAsync: jest.fn(),
  createAssetAsync: jest.fn(),
  deleteAssetsAsync: jest.fn(),
  getAlbumsAsync: jest.fn(),
  getAlbumAsync: jest.fn(),
  createAlbumAsync: jest.fn(),
  deleteAlbumAsync: jest.fn(),
  addAssetsToAlbumAsync: jest.fn(),
  removeAssetsFromAlbumAsync: jest.fn(),
}));

// Mock do expo-ads-admob
jest.mock('expo-ads-admob', () => ({
  AdMobBanner: 'AdMobBanner',
  AdMobInterstitial: {
    setAdUnitID: jest.fn(),
    requestAdAsync: jest.fn(),
    showAdAsync: jest.fn(),
    getIsReadyAsync: jest.fn(),
  },
  AdMobRewarded: {
    setAdUnitID: jest.fn(),
    requestAdAsync: jest.fn(),
    showAdAsync: jest.fn(),
    getIsReadyAsync: jest.fn(),
  },
}));

// Mock do expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Mock do expo-linking
jest.mock('expo-linking', () => ({
  createURL: jest.fn(),
  makeUrl: jest.fn(),
  parse: jest.fn(),
  parseInitialURLAsync: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock do expo-constants
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      eas: {
        projectId: 'mock-project-id',
      },
    },
  },
  Constants: {
    manifest: {
      extra: {
        eas: {
          projectId: 'mock-project-id',
        },
      },
    },
  },
}));

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
}));

// Mock do zustand
jest.mock('zustand', () => ({
  create: jest.fn(),
  subscribeWithSelector: jest.fn(),
}));

// Mock do react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
}));

// Mock do expo-router
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

// Mock do expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Mock do expo-splash-screen
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

// Mock do expo-font
jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true]),
}));

// Mock do expo-image
jest.mock('expo-image', () => ({
  Image: 'Image',
}));

// Mock do expo-blur
jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}));

// Mock do expo-symbols
jest.mock('expo-symbols', () => ({
  Symbol: 'Symbol',
}));

// Mock do expo-system-ui
jest.mock('expo-system-ui', () => ({
  setBackgroundColorAsync: jest.fn(),
}));

// Mock do expo-web-browser
jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(),
  openAuthSessionAsync: jest.fn(),
  dismissBrowser: jest.fn(),
}));

// Mock do react-native-webview
jest.mock('react-native-webview', () => ({
  WebView: 'WebView',
}));

// Mock do react-native-screens
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

// Mock do react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  PanGestureHandler: 'PanGestureHandler',
  TapGestureHandler: 'TapGestureHandler',
  LongPressGestureHandler: 'LongPressGestureHandler',
  State: {
    UNDETERMINED: 0,
    FAILED: 1,
    BEGAN: 2,
    CANCELLED: 3,
    ACTIVE: 4,
    END: 5,
  },
}));

// Mock do useColorScheme (mantendo os outros exports reais)
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    useColorScheme: jest.fn(() => 'light'),
  };
});

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