# 🧪 Documentação de Testes - Synca Beat

## 📋 Visão Geral
Este documento explica como usar os mocks e configurações de teste no projeto Synca Beat.

## 🔧 Mocks Configurados

### React Native Mock
O projeto usa um mock manual para `react-native` localizado em `tests/__mocks__/react-native.js`.

#### Como usar o mock de Platform

```javascript
import { __setPlatformOS } from 'react-native';

describe('Testes específicos de plataforma', () => {
  beforeEach(() => {
    // Reset para iOS por padrão
    __setPlatformOS('ios');
  });

  it('deve funcionar no iOS', () => {
    __setPlatformOS('ios');
    // Seus testes aqui
  });

  it('deve funcionar no Android', () => {
    __setPlatformOS('android');
    // Seus testes aqui
  });
});
```

#### Exemplo prático

```javascript
import { __setPlatformOS } from 'react-native';
import { isPlatformIOS, isPlatformAndroid } from '../../theme';

describe('Detecção de plataforma', () => {
  it('deve detectar iOS corretamente', () => {
    __setPlatformOS('ios');
    expect(isPlatformIOS).toBe(true);
    expect(isPlatformAndroid).toBe(false);
  });

  it('deve detectar Android corretamente', () => {
    __setPlatformOS('android');
    expect(isPlatformIOS).toBe(false);
    expect(isPlatformAndroid).toBe(true);
  });
});
```

### AsyncStorage Mock
O `@react-native-async-storage/async-storage` é mockado automaticamente.

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Em seus testes
const mockGetItem = AsyncStorage.getItem;
const mockSetItem = AsyncStorage.setItem;

mockGetItem.mockResolvedValue('valor-salvo');
mockSetItem.mockResolvedValue();
```

### useColorScheme Mock
O hook `useColorScheme` é mockado para retornar `'light'` por padrão.

```javascript
import { useColorScheme } from 'react-native';

// Para alterar o valor retornado
const mockUseColorScheme = useColorScheme;
mockUseColorScheme.mockReturnValue('dark');
```

## 🚀 Executando Testes

```bash
# Todos os testes
npm test

# Testes unitários
npm run test:unit

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e

# Com cobertura
npm run test:coverage

# Teste específico
npm test tests/unit/contexts/ThemeContext.test.tsx
```

## 📊 Cobertura de Testes
- **Mínima exigida:** 100%
- **Relatórios:** HTML, LCOV e texto
- **Diretório:** `coverage/`

## 🎯 Convenções

### Nomenclatura
- **Arquivos:** `ComponentName.test.tsx`
- **Testes:** `describe('ComponentName', () => {})`
- **Casos:** `it('should do something', () => {})`

### Estrutura
```javascript
describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it('should render correctly', () => {
    // Teste
  });
});
```

## 🔍 Debugging

### Logs de Teste
```bash
npm test -- --verbose
```

### Teste específico com logs
```bash
npm test -- --verbose --testNamePattern="should detect iOS"
```

## 📝 Notas Importantes

1. **Sempre limpar mocks** entre testes usando `jest.clearAllMocks()`
2. **Usar `waitFor`** para operações assíncronas
3. **Testar comportamento, não implementação**
4. **Cobrir casos de erro** além dos casos de sucesso
5. **Usar `act`** para mudanças de estado síncronas

## 🐛 Problemas Comuns

### Jest não consegue parsear arquivos
- Verificar se o arquivo está no `transformIgnorePatterns`
- Adicionar mock específico se necessário

### Testes assíncronos falhando
- Usar `waitFor` em vez de `expect` direto
- Verificar se `act` está sendo usado corretamente

### Mocks não funcionando
- Verificar se o mock está sendo importado corretamente
- Limpar mocks com `jest.clearAllMocks()` 