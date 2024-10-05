const ReactNativeMock = {
  Platform: {
    OS: 'web',
  },
  StyleSheet: {
    create: (styles) => styles,
  },
  View: 'div',
  Text: 'span',
  TouchableOpacity: 'button',
  Dimensions: {
    get: () => ({ width: window.innerWidth, height: window.innerHeight }),
  },
  Animated: {
    Value: class {
      constructor(val) {
        this.val = val;
      }
    },
    timing: () => ({ start: (callback) => callback && callback() }),
  },
  // Add more mock components as needed
};

module.exports = ReactNativeMock;