import React from 'react';
import {ScrollView, Text, StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from "@react-navigation/core";

function HomeScreen(props) {


    const navigation = useNavigation();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',

        },
        topBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            margin: 10,
            marginTop: 0,


        },
        buttonsView: {
            alignItems: 'center',

            marginLeft: 10,
            marginRight: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            flex: 2,
        },
        buttons: {

            backgroundColor: 'grey',
            borderRadius: 10,
            height: '55%',
            width: '45%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonText: {

            textAlign: 'center',

            fontSize: 45,
        },

        list: {
            backgroundColor: 'grey',
            margin: 20,
            flex: 7,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
        },
        settingButton: {

            backgroundColor: 'grey',
            borderRadius: 5,
            height: '45%',
            width: '25%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        settingButtonText: {

            textAlign: 'center',
            bottom: '5%',
            fontSize: 23,
        }, listText: {
            fontSize: 20,
            marginTop: 10,
            margin: 15,
        },


    });


    const goToDiary = () => {
        navigation.navigate('TeaName')
    }
    return (
        <View style={styles.container}>

            <View style={styles.topBar}>


                <TouchableOpacity style={styles.settingButton}>
                    <Text style={styles.settingButtonText}>
                        setting
                    </Text>
                </TouchableOpacity>

                <View>
                    <Icon.Button
                        backgroundColor="white"
                        name="search"
                        color="black"
                        size={35}
                        iconStyle={{
                            marginRight: 0,
                            paddingLeft: 20,
                            paddingRight: 20,

                        }}
                    />
                </View>
            </View>
            <View style={styles.buttonsView}>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.buttonText}>
                        Timer
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}
                                  activeOpacity={1}
                                  onPress={goToDiary}
                >
                    <Text style={styles.buttonText}>
                        Diary
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                <Text style={styles.listText}>
                    History
                </Text>
                <ScrollView>
                    <Text>

                    </Text>
                </ScrollView>
            </View>

        </View>
    )
}

export default HomeScreen
