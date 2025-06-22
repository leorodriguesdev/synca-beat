import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { ThemeProvider, useTheme } from '../../../contexts/ThemeContext';

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock do useColorScheme
// jest.mock('react-native', () => ({
//   useColorScheme: jest.fn(() => 'light'),
// }));

const mockUseColorScheme = useColorScheme as jest.MockedFunction<typeof useColorScheme>;

// Componente de teste para usar o hook
const TestComponent = () => {
  const { theme, themeMode, setThemeMode, toggleTheme, isDark } = useTheme();
  return (
    <View>
      <Text testID="theme-mode">{themeMode}</Text>
      <Text testID="is-dark">{isDark.toString()}</Text>
      <Text testID="primary-color">{theme.colors.primary}</Text>
      <TouchableOpacity onPress={() => setThemeMode('dark')} testID="set-dark">
        <Text>Set Dark</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setThemeMode('light')} testID="set-light">
        <Text>Set Light</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setThemeMode('system')} testID="set-system">
        <Text>Set System</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleTheme} testID="toggle">
        <Text>Toggle</Text>
      </TouchableOpacity>
    </View>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require('react-native'), 'useColorScheme').mockReturnValue('light');
  });

  describe('ThemeProvider', () => {
    it('deve renderizar corretamente com tema padrão', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem.mockResolvedValue(null);

      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(getByTestId('theme-mode')).toHaveTextContent('system');
        expect(getByTestId('is-dark')).toHaveTextContent('false');
      });
    });

    it('deve carregar tema salvo do AsyncStorage', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem.mockResolvedValue('dark');

      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(getByTestId('theme-mode')).toHaveTextContent('dark');
        expect(getByTestId('is-dark')).toHaveTextContent('true');
      });
    });
  });

  describe('useTheme hook', () => {
    it('deve lançar erro quando usado fora do ThemeProvider', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme deve ser usado dentro de um ThemeProvider');

      consoleSpy.mockRestore();
    });

    it('deve retornar tema claro quando modo é light', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem.mockResolvedValue('light');

      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(getByTestId('theme-mode')).toHaveTextContent('light');
        expect(getByTestId('is-dark')).toHaveTextContent('false');
      });
    });

    it('deve retornar tema escuro quando modo é dark', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      mockGetItem.mockResolvedValue('dark');

      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(getByTestId('theme-mode')).toHaveTextContent('dark');
        expect(getByTestId('is-dark')).toHaveTextContent('true');
      });
    });
  });

  describe('setThemeMode', () => {
    it('deve alterar o tema e salvar no AsyncStorage', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>;
      mockGetItem.mockResolvedValue('light');
      mockSetItem.mockResolvedValue();

      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(getByTestId('theme-mode')).toHaveTextContent('light');
      });

      await act(async () => {
        getByTestId('set-dark').props.onPress();
      });

      await waitFor(() => {
        expect(getByTestId('theme-mode')).toHaveTextContent('dark');
        expect(getByTestId('is-dark')).toHaveTextContent('true');
      });

      expect(mockSetItem).toHaveBeenCalledWith('@synca_beat_theme_mode', 'dark');
    });
  });

  describe('toggleTheme', () => {
    it('deve alternar de light para dark', async () => {
      const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
      const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>;
      mockGetItem.mockResolvedValue('light');
      mockSetItem.mockResolvedValue();

      const { getByTestId } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(getByTestId('theme-mode')).toHaveTextContent('light');
      });

      await act(async () => {
        getByTestId('toggle').props.onPress();
      });

      await waitFor(() => {
        expect(getByTestId('theme-mode')).toHaveTextContent('dark');
        expect(getByTestId('is-dark')).toHaveTextContent('true');
      });

      expect(mockSetItem).toHaveBeenCalledWith('@synca_beat_theme_mode', 'dark');
    });
  });
}); 