import {createStackNavigator} from '@react-navigation/stack';

let Stack = createStackNavigator();

import WelcomeScreen from "../../screens/UnathorizedScreens/WelcomeScreen/welcome-screen.tsx";

const UnauthorizedNavigations = () => {
    return (
        <Stack.Navigator
            initialRouteName={'WelcomeScreen'}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        </Stack.Navigator>
    );
};

export default UnauthorizedNavigations;
