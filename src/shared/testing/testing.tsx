function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export * from '@testing-library/react-native';

export {wait};
