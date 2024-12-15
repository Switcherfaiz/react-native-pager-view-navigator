# react-native-pager-view-navigator

**react-native-pager-view-navigator** provides custom React hooks to manage navigation in [react-native-pager-view](https://github.com/callstack/react-native-pager-view). The package offers two hooks for pager initialization and navigation management.

---

## Installation

Install the package along with its peer dependencies:

npm install react-native-pager-view-navigator react-native-pager-view react-navigation-backhandler

---

## Usage

Here's an example of how to use the hooks to navigate between pages and handle navigation events.

### Example Code

import React, { useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import {
  useInitializePagerNavigation,
  usePagerNavigationMethods,
} from 'react-native-pager-view-navigator';

const App = () => {
  const pagerRef = useRef(null);

  // Initialize pager navigation
  const initialized = useInitializePagerNavigation(pagerRef, 0);

  // Access pager navigation methods
  const { navigate, goBack } = usePagerNavigationMethods(pagerRef);

  if (!initialized) {
    return null; // Show a loading indicator or fallback UI if initialization fails
  }

  return (
    <View style={styles.container}>
      <PagerView ref={pagerRef} style={styles.pagerView} initialPage={0}>
        <View key="1" style={styles.page}>
          <Text style={styles.text}>Page 1</Text>
        </View>
        <View key="2" style={styles.page}>
          <Text style={styles.text}>Page 2</Text>
        </View>
        <View key="3" style={styles.page}>
          <Text style={styles.text}>Page 3</Text>
        </View>
      </PagerView>

      <View style={styles.buttonContainer}>
        <Button title="Go to Next Page" onPress={() => navigate(1)} />
        <Button title="Go Back" onPress={goBack} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 16,
  },
});

export default App;

---

### Explanation

1. **Initialization**:

   const initialized = useInitializePagerNavigation(pagerRef, 0);

   Ensures that the pager is initialized correctly with the starting page.

2. **Navigation Methods**:

   const { navigate, goBack } = usePagerNavigationMethods(pagerRef);

   Provides methods for navigating to a specific page (`navigate`) and going back to the previous page (`goBack`).

3. **Buttons for Navigation**:
   - "Go to Next Page" navigates to the second page.
   - "Go Back" navigates back to the previous page in the stack.

---

## API

### useInitializePagerNavigation(pagerRef, initialPage)

Initializes the pager navigation.

#### Parameters:
- pagerRef (Object): A React ref object created using useRef().
- initialPage (number): The index of the initial page.

#### Returns:
- true if initialization succeeds, otherwise false.

---

### usePagerNavigationMethods(pagerRef, initialPage)

Provides methods to manage navigation.

#### Parameters:
- pagerRef (Object): A React ref object for the PagerView.
- initialPage (number): The index of the initial page.

#### Returns:
- navigate(pageIndex): Navigates to the specified page index.
- goBack(): Goes back to the previous page.
- reset(pageIndex): Resets the navigation stack and sets the current page.
- onPageSelected(event): Handles page selection events (useful for callbacks).

---

## License

This project is licensed under the ISC License and code prepared by Switcherfaiz.
