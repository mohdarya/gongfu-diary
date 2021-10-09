import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {persistor, store} from "../reducer/store";
import {Provider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {PersistGate} from "redux-persist/integration/react";
import HomeScreen from "./homescreen";
import DiaryEntry from "./diaryEntry";
import FlavorEntry from "./flavorEntry";
import DiaryListingPage from "./diaryListingPage";
import FlavorDiary from "./flavorDiary";
import TeaNameEntryPage from "./teaNameEntryPage";
import TimerPage from "./timerPage";
import teaNameEntryPageTimer from "./teaNameEntryPageTimer";
import {LogBox} from "react-native";
import NoteEntry from "./noteEntryPage";
import TeaInventory from "./inventoryPage";
import TeaSelection from "./teaSelection";
import TeaInventoryEntry from "./teaInventoyDataEntry";
import TeaDetailPage from "./teaDetailpage";
import TeaInventoryEdit from "./teaInventoyEdit";
import SearchPage from "./searchPage";
import SettingsPage from "./settingsPage";
import DiaryHistoryListing from "./diaryHistoryListing";

function App(props) {
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);



    const Stack = createStackNavigator();
    return (

        <Provider store={store}>

            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>

                    <Stack.Navigator initialRouteName="HomeScreen"
                                     screenOptions={{
                                         headerShown: false,
                                         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                                     }}
                    >
                        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
                        <Stack.Screen name="DiaryEntry" component={DiaryEntry}/>
                        <Stack.Screen name="FlavorEntry" component={FlavorEntry}/>
                        <Stack.Screen name="DiaryListing" component={DiaryListingPage}/>
                        <Stack.Screen name="FlavorDiaryEntry" component={FlavorDiary}/>
                        <Stack.Screen name="TeaName" component={TeaNameEntryPage}/>
                        <Stack.Screen name="TimerTeaName" component={teaNameEntryPageTimer}/>
                        <Stack.Screen name="TimerPage" component={TimerPage}/>
                        <Stack.Screen name="NoteEntry" component={NoteEntry}/>
                        <Stack.Screen name="TeaInventory" component={TeaInventory}/>
                        <Stack.Screen name="TeaSelection" component={TeaSelection}/>
                        <Stack.Screen name="TeaInventoryData" component={TeaInventoryEntry}/>
                        <Stack.Screen name="TeaInventoryEdit" component={TeaInventoryEdit}/>
                        <Stack.Screen name="TeaDetail" component={TeaDetailPage}/>
                        <Stack.Screen name="SearchPage" component={SearchPage}/>
                        <Stack.Screen name="SettingsPage" component={SettingsPage}/>
                        <Stack.Screen name="DiaryHistoryListing" component={DiaryHistoryListing}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );

}


export default App
