import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SteepSelector from "../components/steepSelector";
import RadarChart from "../components/radarChart";
import {useNavigation, useRoute} from "@react-navigation/core";


function DiaryListingPage(props) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',


        },
        teaNameTag: {
            textAlign: 'left',
            fontSize: 15,
            margin: 5,
            marginTop: 1,
        },
        teaName: {


            width: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 15,

            color: 'black',
        },
        teaNameTextView: {


            width: '95%',
            justifyContent: 'center',
            alignSelf: 'center',


        },
        teaFlavorView: {
            backgroundColor: 'grey',
            flex: 4,

            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
        },
        graphView: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,


        },
        teaNameView: {
            height: 'auto',
            width: 200,
            paddingBottom: 10,
            flexDirection: 'column',
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 20,
            alignSelf: 'center',
            backgroundColor: 'grey',
            borderRadius: 20,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
            justifyContent: 'center',
        },
        steepSelector: {
            width: '90%',
            height: '10%',

            marginLeft: 20,
            marginTop: 40,


        },
        teaTag: {
            textAlign: 'center',
            fontSize: 16,
            margin: 5,
            fontWeight: 'bold',
            marginTop: 1,
        }


    })

    const route = useRoute()
const navigation = useNavigation();



    const [steepData, setSteepData] = useState(route.params.data.steeps)


    const [dataToDisplay, setDataToDisplay] = useState(()=> {
        if(steepData[0] === undefined)
        {
            return null
        }
        else {
            return  steepData[0][0]
        }
    })

    const goToFlavorSelection = () => {

        navigation.navigate('FlavorDiaryEntry', {
            steepData: dataToDisplay
        })
    }

    const steepChanged = (index) => {
        setDataToDisplay(steepData[index - 1][0])
    }
    return (
        <View style={styles.container}>
            <View style={[{marginTop: '10%',}, styles.teaNameView]}>
                <View style={{justifyContent: 'center'}}>
                    <Text style={styles.teaTag}>
                        Tea
                    </Text>
                </View>

                <TouchableOpacity style={styles.teaNameTextView}>
                    <Text style={styles.teaName}>
                        {route.params.data.teaName}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.steepSelector}>
                <SteepSelector maxValue={steepData.length} processChange={steepChanged}/>
            </View>

            <TouchableOpacity style={styles.teaFlavorView}
                              activeOpacity={1}
                              onPress={goToFlavorSelection}
            >

                <View>
                    <Text style={styles.teaNameTag}>
                        Flavor
                    </Text>
                </View>
                <View style={styles.graphView}>

                    <RadarChart steeps={dataToDisplay}/>
                </View>
            </TouchableOpacity>


        </View>
    )
}

export default DiaryListingPage
