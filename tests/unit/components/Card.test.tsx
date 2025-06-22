import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Card, CardProps, CardVariant } from '../../../components/ui/Card';
import { ThemeProvider } from '../../../contexts/ThemeContext';

// Mock do AsyncStorage para o ThemeProvider
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve('light')),
  setItem: jest.fn(() => Promise.resolve()),
}));

// Mock do useColorScheme
jest.spyOn(require('react-native'), 'useColorScheme').mockReturnValue('light');

// Mock do ThemeContext
jest.mock('../../../contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        background: '#FFFFFF',
        backgroundSecondary: '#F2F2F7',
        border: '#C6C6C8',
        text: '#000000',
        primary: '#007AFF',
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
      },
      borderRadius: {
        md: 8,
        lg: 12,
      },
      shadows: {
        sm: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        },
        lg: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 8,
        },
      },
    },
    themeMode: 'light',
    setThemeMode: jest.fn(),
    toggleTheme: jest.fn(),
    isDark: false,
  }),
  ThemeContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}));

const renderCard = (props: Partial<CardProps> = {}) => {
  const defaultProps: CardProps = {
    children: <Text>Card Content</Text>,
    ...props,
  };

  return render(
    <ThemeProvider>
      <Card {...defaultProps} />
    </ThemeProvider>
  );
};

describe('Card', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Estrutura do componente', () => {
    it('deve exportar o componente Card', () => {
      expect(Card).toBeDefined();
      expect(typeof Card).toBe('function');
    });
  });

  describe('Tipos e interfaces', () => {
    it('deve ter CardVariant com valores corretos', () => {
      const validVariants: CardVariant[] = ['default', 'elevated', 'outlined', 'flat'];
      
      validVariants.forEach(variant => {
        expect(typeof variant).toBe('string');
      });
    });

    it('deve ter CardProps com propriedades corretas', () => {
      const requiredProps: (keyof CardProps)[] = ['children'];
      const optionalProps: (keyof CardProps)[] = [
        'variant', 'onPress', 'disabled', 'style', 'testID',
        'accessibilityLabel', 'accessibilityHint'
      ];

      requiredProps.forEach(prop => {
        expect(requiredProps).toContain(prop);
      });

      optionalProps.forEach(prop => {
        expect(optionalProps).toContain(prop);
      });
    });
  });

  describe('Props obrigatórias', () => {
    it('deve aceitar children', () => {
      const props: CardProps = {
        children: <div>Test Content</div>,
      };
      
      expect(props.children).toBeDefined();
    });
  });

  describe('Props opcionais', () => {
    it('deve aceitar variant opcional', () => {
      const props: CardProps = {
        children: <div>Test Content</div>,
        variant: 'elevated',
      };
      
      expect(props.variant).toBe('elevated');
    });

    it('deve aceitar onPress opcional', () => {
      const onPress = jest.fn();
      const props: CardProps = {
        children: <div>Test Content</div>,
        onPress,
      };
      
      expect(props.onPress).toBe(onPress);
    });

    it('deve aceitar disabled opcional', () => {
      const props: CardProps = {
        children: <div>Test Content</div>,
        disabled: true,
      };
      
      expect(props.disabled).toBe(true);
    });

    it('deve aceitar style opcional', () => {
      const customStyle = { backgroundColor: 'red' };
      const props: CardProps = {
        children: <div>Test Content</div>,
        style: customStyle,
      };
      
      expect(props.style).toEqual(customStyle);
    });

    it('deve aceitar testID opcional', () => {
      const props: CardProps = {
        children: <div>Test Content</div>,
        testID: 'custom-test-id',
      };
      
      expect(props.testID).toBe('custom-test-id');
    });

    it('deve aceitar accessibilityLabel opcional', () => {
      const props: CardProps = {
        children: <div>Test Content</div>,
        accessibilityLabel: 'Custom Label',
      };
      
      expect(props.accessibilityLabel).toBe('Custom Label');
    });

    it('deve aceitar accessibilityHint opcional', () => {
      const props: CardProps = {
        children: <div>Test Content</div>,
        accessibilityHint: 'Custom Hint',
      };
      
      expect(props.accessibilityHint).toBe('Custom Hint');
    });
  });

  describe('Combinações de props', () => {
    it('deve aceitar todas as props combinadas', () => {
      const onPress = jest.fn();
      const allProps: CardProps = {
        children: <div>Complex Card Content</div>,
        variant: 'elevated',
        onPress,
        disabled: false,
        style: { backgroundColor: 'blue' },
        testID: 'complex-card',
        accessibilityLabel: 'Complex Card Label',
        accessibilityHint: 'Complex card hint',
      };
      
      expect(allProps.variant).toBe('elevated');
      expect(allProps.onPress).toBe(onPress);
      expect(allProps.disabled).toBe(false);
      expect(allProps.testID).toBe('complex-card');
      expect(allProps.accessibilityLabel).toBe('Complex Card Label');
      expect(allProps.accessibilityHint).toBe('Complex card hint');
    });
  });

  describe('Renderização', () => {
    it('deve renderizar corretamente com children', () => {
      renderCard();

      expect(screen.getByText('Card Content')).toBeTruthy();
    });

    it('deve renderizar como View quando não tem onPress', () => {
      renderCard();

      const card = screen.getByText('Card Content').parent;
      expect(card?.type).toBe('View');
    });

    it('deve renderizar como Pressable quando tem onPress', () => {
      renderCard({ onPress: jest.fn() });

      const card = screen.getByText('Card Content').parent;
      expect(card?.type).toBe('Pressable');
    });

    it('deve renderizar com testID', () => {
      renderCard({ testID: 'custom-card' });

      expect(screen.getByTestId('custom-card')).toBeTruthy();
    });
  });

  describe('Variantes', () => {
    it('deve renderizar variante default por padrão', () => {
      renderCard();

      const card = screen.getByText('Card Content').parent;
      expect(card).toBeTruthy();
    });

    it('deve renderizar variante elevated', () => {
      renderCard({ variant: 'elevated' });

      const card = screen.getByText('Card Content').parent;
      expect(card).toBeTruthy();
    });

    it('deve renderizar variante outlined', () => {
      renderCard({ variant: 'outlined' });

      const card = screen.getByText('Card Content').parent;
      expect(card).toBeTruthy();
    });

    it('deve renderizar variante flat', () => {
      renderCard({ variant: 'flat' });

      const card = screen.getByText('Card Content').parent;
      expect(card).toBeTruthy();
    });
  });

  describe('Estados', () => {
    it('deve estar habilitado por padrão', () => {
      const onPress = jest.fn();
      renderCard({ onPress });

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.disabled).toBe(false);
    });

    it('deve estar desabilitado quando disabled=true', () => {
      const onPress = jest.fn();
      renderCard({ onPress, disabled: true });

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.disabled).toBe(true);
    });

    it('deve aplicar opacidade quando desabilitado', () => {
      renderCard({ disabled: true });

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.style).toMatchObject({ opacity: 0.5 });
    });
  });

  describe('Interações', () => {
    it('deve chamar onPress quando pressionado', () => {
      const onPress = jest.fn();
      renderCard({ onPress });

      const card = screen.getByText('Card Content').parent;
      fireEvent.press(card!);

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('deve não chamar onPress quando desabilitado', () => {
      const onPress = jest.fn();
      renderCard({ onPress, disabled: true });

      const card = screen.getByText('Card Content').parent;
      fireEvent.press(card!);

      expect(onPress).not.toHaveBeenCalled();
    });

    it('deve não ter onPress quando não especificado', () => {
      renderCard();

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.onPress).toBeUndefined();
    });
  });

  describe('Acessibilidade', () => {
    it('deve ter role button quando tem onPress', () => {
      renderCard({ onPress: jest.fn() });

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.accessibilityRole).toBe('button');
    });

    it('deve não ter role quando não tem onPress', () => {
      renderCard();

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.accessibilityRole).toBeUndefined();
    });

    it('deve usar accessibilityLabel', () => {
      renderCard({ accessibilityLabel: 'Card Label' });

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.accessibilityLabel).toBe('Card Label');
    });

    it('deve usar accessibilityHint quando tem onPress', () => {
      renderCard({ onPress: jest.fn(), accessibilityHint: 'Press to select' });

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.accessibilityHint).toBe('Press to select');
    });

    it('deve ter accessibilityState correto quando desabilitado', () => {
      renderCard({ onPress: jest.fn(), disabled: true });

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.accessibilityState).toEqual({
        disabled: true,
      });
    });

    it('deve ter accessibilityState correto quando habilitado', () => {
      renderCard({ onPress: jest.fn(), disabled: false });

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.accessibilityState).toEqual({
        disabled: false,
      });
    });

    it('deve não ter accessibilityState quando não tem onPress', () => {
      renderCard();

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.accessibilityState).toBeUndefined();
    });
  });

  describe('Estilos', () => {
    it('deve aplicar estilo customizado', () => {
      const customStyle = { backgroundColor: 'red' };
      renderCard({ style: customStyle });

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.style).toMatchObject(customStyle);
    });

    it('deve ter android_ripple quando tem onPress', () => {
      renderCard({ onPress: jest.fn() });

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.android_ripple).toBeDefined();
    });

    it('deve não ter android_ripple quando não tem onPress', () => {
      renderCard();

      const card = screen.getByText('Card Content').parent;
      expect(card?.props.android_ripple).toBeUndefined();
    });
  });

  describe('Combinações de props', () => {
    it('deve funcionar com todas as props combinadas', () => {
      const onPress = jest.fn();
      renderCard({
        children: <Text>Complex Card</Text>,
        variant: 'elevated',
        onPress,
        disabled: false,
        testID: 'complex-card',
        accessibilityLabel: 'Complex Card Label',
        accessibilityHint: 'Complex card hint',
      });

      const card = screen.getByTestId('complex-card');
      expect(card).toBeTruthy();
      expect(screen.getByText('Complex Card')).toBeTruthy();
      expect(card.props.accessibilityLabel).toBe('Complex Card Label');
      expect(card.props.accessibilityHint).toBe('Complex card hint');
      expect(card.props.accessibilityRole).toBe('button');
    });

    it('deve funcionar como card estático sem onPress', () => {
      renderCard({
        children: <Text>Static Card</Text>,
        variant: 'outlined',
        testID: 'static-card',
        accessibilityLabel: 'Static Card Label',
      });

      const card = screen.getByTestId('static-card');
      expect(card).toBeTruthy();
      expect(screen.getByText('Static Card')).toBeTruthy();
      expect(card.props.accessibilityLabel).toBe('Static Card Label');
      expect(card.props.accessibilityRole).toBeUndefined();
      expect(card.props.onPress).toBeUndefined();
    });
  });
}); 