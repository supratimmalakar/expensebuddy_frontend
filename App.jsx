import { StyleSheet, Dimensions } from 'react-native';
import { AuthenticationContainer, StackContainer } from './containers';
import { AuthProvider } from './providers/auth';

export default function App() {
  return (
    <AuthProvider>
      <StackContainer />
    </AuthProvider>
  );
}