import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import our screens
import VendorSplashScreen from './src/screens/VendorSplashScreen';
import VendorRegisterScreen from './src/screens/VendorRegisterScreen';
import VendorLoginScreen from './src/screens/VendorLoginScreen';
import VendorDashboardScreen from './src/screens/VendorDashboardScreen';
import VendorOrdersScreen from './src/screens/VendorOrdersScreen';
import VendorOrderDetailsScreen from './src/screens/VendorOrderDetailsScreen';
import VendorProductListScreen from './src/screens/VendorProductListScreen';
import VendorAddProductScreen from './src/screens/VendorAddProductScreen';
import VendorEditProductScreen from './src/screens/VendorEditProductScreen';
import VendorProfileScreen from './src/screens/VendorProfileScreen';



export type RootStackParamList = {
  VendorSplashScreen: undefined;
  VendorRegisterScreen: undefined;
  VendorLogin: undefined;
  VendorDashboard: undefined;
  VendorOrders: undefined;
  VendorOrderDetail: { orderId: string };
  VendorProductList: undefined;
  VendorAddProduct: undefined;
  VendorEditProduct: { productId: string };
  VendorProfile: undefined;
};



const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <Stack.Navigator
          initialRouteName="VendorSplashScreen"
          screenOptions={{
            headerShown: false, // Hide headers for these screens
          }}>
          <Stack.Screen
            name="VendorSplashScreen"
            component={VendorSplashScreen}
          />
          <Stack.Screen
            name="VendorRegisterScreen"
            component={VendorRegisterScreen}
          />
          <Stack.Screen
            name="VendorLogin"
            component={VendorLoginScreen}
          />
          <Stack.Screen
            name="VendorDashboard"
            component={VendorDashboardScreen}
          />
          <Stack.Screen
            name="VendorOrders"
            component={VendorOrdersScreen}
          />
          <Stack.Screen
            name="VendorOrderDetail"
            component={VendorOrderDetailsScreen}
          />
          <Stack.Screen
            name="VendorProductList"
            component={VendorProductListScreen}
          />
          <Stack.Screen
            name="VendorAddProduct"
            component={VendorAddProductScreen}
          />
          <Stack.Screen
            name="VendorEditProduct"
            component={VendorEditProductScreen}
          />
          <Stack.Screen
            name="VendorProfile"
            component={VendorProfileScreen}
          />
        </Stack.Navigator>


      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
