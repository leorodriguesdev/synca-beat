let currentOS = 'ios';

const Platform = {
  get OS() {
    return currentOS;
  },
  set OS(value) {
    currentOS = value;
  },
  select: (obj) => obj[currentOS],
};

function __setPlatformOS(os) {
  currentOS = os;
}

const jestMock = require('jest-mock');
const React = require('react');

// Mock dos componentes React Native
const createMockComponent = (displayName) => {
  const MockComponent = React.forwardRef((props, ref) => {
    return React.createElement('div', { ...props, ref, 'data-testid': displayName });
  });
  MockComponent.displayName = displayName;
  return MockComponent;
};

module.exports = {
  Platform,
  useColorScheme: jestMock.fn(() => 'light'),
  
  // Componentes básicos
  View: createMockComponent('View'),
  Text: createMockComponent('Text'),
  TouchableOpacity: createMockComponent('TouchableOpacity'),
  Pressable: createMockComponent('Pressable'),
  ActivityIndicator: createMockComponent('ActivityIndicator'),
  StatusBar: createMockComponent('StatusBar'),
  ScrollView: createMockComponent('ScrollView'),
  FlatList: createMockComponent('FlatList'),
  Image: createMockComponent('Image'),
  TextInput: createMockComponent('TextInput'),
  Switch: createMockComponent('Switch'),
  Modal: createMockComponent('Modal'),
  Alert: {
    alert: jestMock.fn(),
  },
  
  // APIs
  Animated: {
    Value: jestMock.fn(),
    timing: jestMock.fn(),
    spring: jestMock.fn(),
    View: createMockComponent('Animated.View'),
    Text: createMockComponent('Animated.Text'),
  },
  
  // Utilitários
  Dimensions: {
    get: jestMock.fn(() => ({ width: 375, height: 667 })),
  },
  
  __setPlatformOS,
}; 