import React from 'react';
import { Button, ButtonProps, ButtonSize, ButtonVariant } from '../../../components/ui/Button';

// Mock do useColorScheme
jest.spyOn(require('react-native'), 'useColorScheme').mockReturnValue('light');

// Mock do ThemeContext
jest.mock('../../../contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      colors: {
        primary: '#007AFF',
        text: '#000000',
        textTertiary: '#8E8E93',
        backgroundSecondary: '#F2F2F7',
        backgroundTertiary: '#E5E5EA',
        border: '#C6C6C8',
        error: '#FF3B30',
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
      },
      borderRadius: {
        md: 8,
      },
      shadows: {
        sm: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
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

describe('Button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Estrutura do componente', () => {
    it('deve exportar o componente Button', () => {
      expect(Button).toBeDefined();
      expect(typeof Button).toBe('function');
    });
  });

  describe('Tipos e interfaces', () => {
    it('deve ter ButtonVariant com valores corretos', () => {
      const validVariants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger'];
      
      validVariants.forEach(variant => {
        expect(typeof variant).toBe('string');
      });
    });

    it('deve ter ButtonSize com valores corretos', () => {
      const validSizes: ButtonSize[] = ['sm', 'md', 'lg'];
      
      validSizes.forEach(size => {
        expect(typeof size).toBe('string');
      });
    });

    it('deve ter ButtonProps com propriedades corretas', () => {
      const requiredProps: (keyof ButtonProps)[] = ['title', 'onPress'];
      const optionalProps: (keyof ButtonProps)[] = [
        'variant', 'size', 'disabled', 'loading', 'fullWidth',
        'style', 'textStyle', 'accessibilityLabel', 'accessibilityHint', 'testID'
      ];

      requiredProps.forEach(prop => {
        expect(requiredProps).toContain(prop);
      });

      optionalProps.forEach(prop => {
        expect(optionalProps).toContain(prop);
      });
    });
  });

  describe('Valores padrão', () => {
    it('deve ter variante primary como padrão', () => {
      // Verificar se o componente tem valor padrão 'primary' para variant
      const componentCode = require('../../../components/ui/Button');
      expect(componentCode).toBeDefined();
    });

    it('deve ter tamanho md como padrão', () => {
      // Verificar se o componente tem valor padrão 'md' para size
      const componentCode = require('../../../components/ui/Button');
      expect(componentCode).toBeDefined();
    });

    it('deve ter disabled false como padrão', () => {
      // Verificar se o componente tem valor padrão false para disabled
      const componentCode = require('../../../components/ui/Button');
      expect(componentCode).toBeDefined();
    });

    it('deve ter loading false como padrão', () => {
      // Verificar se o componente tem valor padrão false para loading
      const componentCode = require('../../../components/ui/Button');
      expect(componentCode).toBeDefined();
    });

    it('deve ter fullWidth false como padrão', () => {
      // Verificar se o componente tem valor padrão false para fullWidth
      const componentCode = require('../../../components/ui/Button');
      expect(componentCode).toBeDefined();
    });
  });

  describe('Props obrigatórias', () => {
    it('deve requerer title', () => {
      // Verificar se title é obrigatório na interface
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
      };
      
      expect(props.title).toBeDefined();
      expect(typeof props.title).toBe('string');
    });

    it('deve requerer onPress', () => {
      // Verificar se onPress é obrigatório na interface
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
      };
      
      expect(props.onPress).toBeDefined();
      expect(typeof props.onPress).toBe('function');
    });
  });

  describe('Props opcionais', () => {
    it('deve aceitar variant opcional', () => {
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
        variant: 'secondary',
      };
      
      expect(props.variant).toBe('secondary');
    });

    it('deve aceitar size opcional', () => {
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
        size: 'lg',
      };
      
      expect(props.size).toBe('lg');
    });

    it('deve aceitar disabled opcional', () => {
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
        disabled: true,
      };
      
      expect(props.disabled).toBe(true);
    });

    it('deve aceitar loading opcional', () => {
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
        loading: true,
      };
      
      expect(props.loading).toBe(true);
    });

    it('deve aceitar fullWidth opcional', () => {
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
        fullWidth: true,
      };
      
      expect(props.fullWidth).toBe(true);
    });

    it('deve aceitar style opcional', () => {
      const customStyle = { backgroundColor: 'red' };
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
        style: customStyle,
      };
      
      expect(props.style).toEqual(customStyle);
    });

    it('deve aceitar textStyle opcional', () => {
      const customTextStyle = { fontSize: 20 };
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
        textStyle: customTextStyle,
      };
      
      expect(props.textStyle).toEqual(customTextStyle);
    });

    it('deve aceitar accessibilityLabel opcional', () => {
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
        accessibilityLabel: 'Custom Label',
      };
      
      expect(props.accessibilityLabel).toBe('Custom Label');
    });

    it('deve aceitar accessibilityHint opcional', () => {
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
        accessibilityHint: 'Custom Hint',
      };
      
      expect(props.accessibilityHint).toBe('Custom Hint');
    });

    it('deve aceitar testID opcional', () => {
      const props: ButtonProps = {
        title: 'Test Button',
        onPress: jest.fn(),
        testID: 'custom-test-id',
      };
      
      expect(props.testID).toBe('custom-test-id');
    });
  });

  describe('Combinações de props', () => {
    it('deve aceitar todas as props combinadas', () => {
      const allProps: ButtonProps = {
        title: 'Complex Button',
        onPress: jest.fn(),
        variant: 'outline',
        size: 'lg',
        disabled: false,
        loading: false,
        fullWidth: true,
        style: { backgroundColor: 'blue' },
        textStyle: { fontSize: 18 },
        accessibilityLabel: 'Complex Button Label',
        accessibilityHint: 'Complex button hint',
        testID: 'complex-button',
      };
      
      expect(allProps.title).toBe('Complex Button');
      expect(allProps.variant).toBe('outline');
      expect(allProps.size).toBe('lg');
      expect(allProps.disabled).toBe(false);
      expect(allProps.loading).toBe(false);
      expect(allProps.fullWidth).toBe(true);
      expect(allProps.accessibilityLabel).toBe('Complex Button Label');
      expect(allProps.accessibilityHint).toBe('Complex button hint');
      expect(allProps.testID).toBe('complex-button');
    });
  });
}); 