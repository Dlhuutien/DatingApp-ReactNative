import { Appbar } from 'react-native-paper';

const MyComponent = () => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title="My Title" />
      <Appbar.Action icon="magnify" onPress={() => {}} />
    </Appbar.Header>
  );
};
