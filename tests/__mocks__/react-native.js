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

module.exports = {
  Platform,
  useColorScheme: jestMock.fn(() => 'light'),
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  __setPlatformOS,
}; 