import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {persistor, store} from "../reducer/store";
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {PersistGate} from "redux-persist/integration/react";
import HomeScreen from "./homescreen";

function App(props)
{
    const Stack = createStackNavigator();
    return (

        <Provider store={store}>

            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>

                    <Stack.Navigator initialRouteName="HomePage"
                                     screenOptions={{
                                         headerShown: false,
                                         gestureEnabled: true,
                                         gestureDirection: 'horizontal',
                                         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,

                                     }}
                    >
                        <Stack.Screen name="HomeScreen" component={HomeScreen}/>

                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );

}


export default App
