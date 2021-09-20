import React, {useRef} from 'react';
import {Animated, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import DiaryListingSection from "../components/diaryListingSection";

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

            width: '100%',
            height: '100%',
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
            fontWeight: 'bold'
        }, searchView: {
backgroundColor: 'grey',

        },
        settingView:{
            height: '45%',

        }


    });



    const searchAnimation = useRef(new Animated.Value(0)).current
    const settingVisibility = useRef(new Animated.Value(0)).current
    const settingWidth = useRef(new Animated.Value(0)).current

    const searchSelected = () => {

        Animated.parallel([
            // after decay, in parallel:
            Animated.sequence([
                 Animated.timing(
                    settingVisibility,
                    {
                        toValue: 100,
                        duration: 400,
                        useNativeDriver: false
                    }
                ),  Animated.timing(
                    settingWidth,
                    {
                        toValue: 100,
                        duration: 1,
                        useNativeDriver: false
                    }
                )]),
            Animated.timing(
                searchAnimation,
                {
                    toValue: 100,
                    duration: 400,
                    useNativeDriver: false
                }
            )
        ]).start();


    }
  
    const goToDiary = () => {
        navigation.navigate('TeaName')
    }
    return (
        <View style={styles.container}>

            <View style={styles.topBar}>


                <Animated.View style={[styles.settingView, {translateX: settingVisibility.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, -100],
                    }), width: settingVisibility.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['25%', '0%'],
                    })} ]}>
          <TouchableOpacity style={styles.settingButton}>
                    <Text style={styles.settingButtonText}>
                        setting
                    </Text>
                </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.searchView, {width: searchAnimation.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['23%', '100%'],
                    }),}]}>
                    <View style={{width: 40, height: 40}}>
                        <TouchableOpacity onPress={searchSelected} activeOpacity={1} style={{width: '100%', height: '100%'}}>
                            <Image style={{height: '100%', width: '100%'}} source={require('../img/search.png')}/>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
            <View style={styles.buttonsView}>
                <TouchableOpacity style={styles.buttons} activeOpacity={1} onPress={() => {
                    navigation.navigate("TimerTeaName")
                }}>
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
                <View style={{height: '80%', margin: 15,}}>
                    <DiaryListingSection/>
                </View>
            </View>

        </View>
    )
}

export default HomeScreen
