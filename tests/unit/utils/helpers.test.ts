import {
    calculatePercentage,
    capitalize,
    clamp,
    debounce,
    formatBytes,
    formatTime,
    formatTimeLong,
    generateId,
    getFileExtension,
    getFileName,
    interpolate,
    isAndroid,
    isAudioFile,
    isIOS,
    isValidEmail,
    isValidUrl,
    removeAccents,
    throttle,
    toSlug,
    truncate,
} from '../../../utils/helpers';

describe('Utils - Helpers', () => {
  describe('formatTime', () => {
    it('should format seconds to MM:SS format', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(30)).toBe('00:30');
      expect(formatTime(60)).toBe('01:00');
      expect(formatTime(90)).toBe('01:30');
      expect(formatTime(125)).toBe('02:05');
      expect(formatTime(3600)).toBe('60:00');
    });

    it('should handle negative values', () => {
      expect(formatTime(-30)).toBe('00:30');
      expect(formatTime(-90)).toBe('01:30');
    });
  });

  describe('formatTimeLong', () => {
    it('should format seconds to HH:MM:SS format for long durations', () => {
      expect(formatTimeLong(0)).toBe('00:00');
      expect(formatTimeLong(30)).toBe('00:30');
      expect(formatTimeLong(3600)).toBe('01:00:00');
      expect(formatTimeLong(3661)).toBe('01:01:01');
      expect(formatTimeLong(7325)).toBe('02:02:05');
    });

    it('should format seconds to MM:SS format for short durations', () => {
      expect(formatTimeLong(30)).toBe('00:30');
      expect(formatTimeLong(125)).toBe('02:05');
      expect(formatTimeLong(3599)).toBe('59:59');
    });
  });

  describe('formatBytes', () => {
    it('should format bytes to human readable format', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(1048576)).toBe('1 MB');
      expect(formatBytes(1073741824)).toBe('1 GB');
      expect(formatBytes(1536)).toBe('1.5 KB');
      expect(formatBytes(1572864)).toBe('1.5 MB');
    });

    it('should handle large numbers', () => {
      expect(formatBytes(1099511627776)).toBe('1 TB');
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', () => {
      jest.useFakeTimers();
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn('test1');
      debouncedFn('test2');
      debouncedFn('test3');

      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1000);

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('test3');

      jest.useRealTimers();
    });
  });

  describe('throttle', () => {
    it('should throttle function calls', () => {
      jest.useFakeTimers();
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 1000);

      throttledFn('test1');
      throttledFn('test2');
      throttledFn('test3');

      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('test1');

      jest.advanceTimersByTime(1000);

      throttledFn('test4');
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenCalledWith('test4');

      jest.useRealTimers();
    });
  });

  describe('Platform detection', () => {
    it('should detect iOS platform', () => {
      // Mock Platform.OS
      const originalPlatform = require('react-native').Platform;
      require('react-native').Platform = { OS: 'ios' };

      expect(isIOS()).toBe(true);
      expect(isAndroid()).toBe(false);

      // Restore original
      require('react-native').Platform = originalPlatform;
    });

    it('should detect Android platform', () => {
      // Mock Platform.OS
      const originalPlatform = require('react-native').Platform;
      require('react-native').Platform = { OS: 'android' };

      expect(isIOS()).toBe(false);
      expect(isAndroid()).toBe(true);

      // Restore original
      require('react-native').Platform = originalPlatform;
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter of string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
      expect(capitalize('')).toBe('');
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('removeAccents', () => {
    it('should remove accents from string', () => {
      expect(removeAccents('café')).toBe('cafe');
      expect(removeAccents('São Paulo')).toBe('Sao Paulo');
      expect(removeAccents('João')).toBe('Joao');
      expect(removeAccents('hello')).toBe('hello');
      expect(removeAccents('')).toBe('');
    });
  });

  describe('isValidEmail', () => {
    it('should validate email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('should validate URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path')).toBe(true);
      expect(isValidUrl('invalid-url')).toBe(false);
      expect(isValidUrl('')).toBe(false);
    });
  });

  describe('truncate', () => {
    it('should truncate strings', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('Short', 10)).toBe('Short');
      expect(truncate('', 5)).toBe('');
      expect(truncate('Test', 0)).toBe('...');
    });
  });

  describe('toSlug', () => {
    it('should convert string to slug', () => {
      expect(toSlug('Hello World')).toBe('hello-world');
      expect(toSlug('São Paulo')).toBe('sao-paulo');
      expect(toSlug('Test 123!')).toBe('test-123');
      expect(toSlug('')).toBe('');
      expect(toSlug('   test   ')).toBe('test');
    });
  });

  describe('getFileName', () => {
    it('should extract filename from path', () => {
      expect(getFileName('/path/to/file.txt')).toBe('file.txt');
      expect(getFileName('file.txt')).toBe('file.txt');
      expect(getFileName('/path/to/')).toBe('');
      expect(getFileName('')).toBe('');
    });
  });

  describe('getFileExtension', () => {
    it('should extract file extension', () => {
      expect(getFileExtension('file.txt')).toBe('txt');
      expect(getFileExtension('image.jpg')).toBe('jpg');
      expect(getFileExtension('document.pdf')).toBe('pdf');
      expect(getFileExtension('noextension')).toBe('');
      expect(getFileExtension('')).toBe('');
    });
  });

  describe('isAudioFile', () => {
    it('should detect audio files', () => {
      expect(isAudioFile('song.mp3')).toBe(true);
      expect(isAudioFile('audio.wav')).toBe(true);
      expect(isAudioFile('music.aac')).toBe(true);
      expect(isAudioFile('track.m4a')).toBe(true);
      expect(isAudioFile('sound.flac')).toBe(true);
      expect(isAudioFile('podcast.ogg')).toBe(true);
      expect(isAudioFile('file.wma')).toBe(true);
      expect(isAudioFile('document.pdf')).toBe(false);
      expect(isAudioFile('image.jpg')).toBe(false);
      expect(isAudioFile('')).toBe(false);
    });

    it('should handle case insensitive extensions', () => {
      expect(isAudioFile('song.MP3')).toBe(true);
      expect(isAudioFile('audio.WAV')).toBe(true);
      expect(isAudioFile('music.AAC')).toBe(true);
    });
  });

  describe('calculatePercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(calculatePercentage(50, 100)).toBe(50);
      expect(calculatePercentage(25, 100)).toBe(25);
      expect(calculatePercentage(0, 100)).toBe(0);
      expect(calculatePercentage(100, 100)).toBe(100);
      expect(calculatePercentage(33, 99)).toBe(33);
    });

    it('should handle edge cases', () => {
      expect(calculatePercentage(0, 0)).toBe(0);
      expect(calculatePercentage(10, 0)).toBe(0);
      expect(calculatePercentage(-10, 100)).toBe(-10);
    });
  });

  describe('interpolate', () => {
    it('should interpolate values correctly', () => {
      expect(interpolate(50, 0, 100, 0, 200)).toBe(100);
      expect(interpolate(25, 0, 100, 0, 100)).toBe(25);
      expect(interpolate(0, 0, 100, 10, 110)).toBe(10);
      expect(interpolate(100, 0, 100, 10, 110)).toBe(110);
    });

    it('should handle edge cases', () => {
      expect(interpolate(0, 0, 0, 0, 100)).toBe(NaN);
      expect(interpolate(50, 0, 100, 100, 100)).toBe(100);
    });
  });

  describe('clamp', () => {
    it('should clamp values within range', () => {
      expect(clamp(50, 0, 100)).toBe(50);
      expect(clamp(-10, 0, 100)).toBe(0);
      expect(clamp(150, 0, 100)).toBe(100);
      expect(clamp(0, 0, 100)).toBe(0);
      expect(clamp(100, 0, 100)).toBe(100);
    });

    it('should handle edge cases', () => {
      expect(clamp(50, 100, 0)).toBe(50); // min > max
      expect(clamp(50, 50, 50)).toBe(50); // min === max
    });
  });
}); 