import { Stack } from 'expo-router';
export default function Layout() {
  return (
    <Stack>
     
      <Stack.Screen
        name="filter"
        options={{
          // Set the presentation mode to modal for our modal route.
         presentation:"transparentModal"
        }}
      />
    </Stack>
  );
}
