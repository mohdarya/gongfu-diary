import {createStackNavigator} from "@react-navigation/stack";
import {persistor, store} from "../reducer/store";
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {PersistGate} from "redux-persist/integration/react";

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
                        <Stack.Screen name="HomePage" component={HomePage}/>

                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );

}


    export default App
