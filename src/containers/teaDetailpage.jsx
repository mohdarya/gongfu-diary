import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, Image, Linking, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import HistoryItem from "../components/historyItem";
import {connect} from "react-redux";
import {archiveTea, unarchiveTea} from "../action/currentTeaAction";


function TeaDetailPage(props) {


    const navigation = useNavigation()
    const
        styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#264653',
                justifyContent: 'flex-start',


            },


            topPart: {
                height: 170,
                width: '100%',


            },
            topPartBar: {
                height: 170,
                width: '100%',

                alignItems: 'center',
                backgroundColor: '#2A9D8F',
                borderBottomLeftRadius: 93,
                borderBottomRightRadius: 93,

            }, HistoryViewTextView: {
                width: '100%',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center'
            },
            historyContainer: {
                top: "23%",
                height: '55%',
                marginLeft: 15,
                marginRight: 15,

            },
            historyView: {
                alignSelf: 'center',
                height: '80%',
                marginLeft: 15,
                marginRight: 15,


            }, sessionActionMenu: {
                height: 66,
                width: 'auto',
                flexDirection: 'row',
                borderRadius: 25,

                alignItems: "center",
                justifyContent: 'center',
                alignSelf: "flex-end",

            },


        })


    const route = useRoute()
    const data = props.teaAvailable[route.params.teaID]
    let beginX
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const textInputWidth = useRef(new Animated.Value(0)).current
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const iconWidth = useRef(new Animated.Value(0)).current
    const [editActive, setEdit] = useState(false)
    const [editBackground, setEditBackground] = useState({backgroundColor: '#E9C46A',})
    const [historyItems, setHistoryItems] = useState([])
    const [openNavigation, setOpenNavigation] = useState(false)
    const [archived, setArchived] = useState(() => {
        return data.status === 'archived';
    })

    useEffect(() => {
        setArchived(data.status === 'archived')

    }, [props.teaAvailable])
    useEffect(() => {
        let items = []

        let loopNumber = props.diary.length

        if (loopNumber > 5) {
            loopNumber = 5
        }
        for (let i = 0; i < loopNumber; i++) {
            if (props.diary[props.diary.length - 1 - i].teaID === route.params.teaID) {
                items.push({...props.diary[props.diary.length - 1 - i]})
            }
        }
        setHistoryItems(items)
    }, [props.wholeDiary])


    const renderItems = ({item}) => {


        return (
            <HistoryItem key={`historyItem${item.sessionID}`} data={{...item}}/>
        )
    }

    let backgroundColour

    if(props.teaAvailable[route.params.teaID].type === 'Hei cha')
    {
        backgroundColour = props.colors.HeiCha
    }
    else if(props.teaAvailable[route.params.teaID].type === 'Raw Pu-erh')
    { backgroundColour = props.colors.RawPuerh}
    else if(props.teaAvailable[route.params.teaID].type === 'Ripe Pu-erh')
    {
        backgroundColour = props.colors.RipePuerh
    }
    else{
        backgroundColour = props.colors[props.teaAvailable[route.params.teaID].type]
    }
    const [teaNameToDisplay, setTeaName] = useState()


    useEffect(() => {

        if (openNavigation) {
            Animated.timing(textInputWidth, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }).start();
            Animated.timing(iconWidth, {
                toValue: 1,
                duration: 1,
                useNativeDriver: false,
            }).start();

        } else if (!openNavigation) {
            Animated.timing(textInputWidth, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
            Animated.timing(iconWidth, {
                toValue: 0,
                duration: 1,
                useNativeDriver: false,
            }).start();
        }
    }, [openNavigation])
    useEffect(()=> {
        if(props.teaAvailable[route.params.teaID].teaName.length <=80)
        {
            setTeaName(props.teaAvailable[route.params.teaID].teaName)
        }
        else {
            setTeaName( props.teaAvailable[route.params.teaID].teaName.substring(0, 80) + ' ...')
        }
    }, [props.teaAvailable])


    function validURL(str) {
        let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(str);
    }


    return (


        <View style={styles.container}>
            <View style={styles.topPart}>
                <View style={styles.topPartBar}>
                    <View style={{
                        top: 10,
                        width: 50,
                        height: 50,
                        backgroundColor: backgroundColour,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity activeOpacity={1} style={{width: 30, height: 30, }}>
                            <Image style={{height: '100%', width: '100%'}} source={require('../img/teaLeafWhite.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    top: '40%',
                    left: '20%',
                    width: '60%',
                    height: 270,
                    backgroundColor: '#E9C46A',
                    borderRadius: 50,
                    position: "absolute",
                    alignContent: 'space-around',
                    justifyContent: 'space-around'
                }}>
                    <Text style={{

                        textAlignVertical: 'center',
                        height: 90,
                        marginLeft: 10,
                        marginRight: 10,
                        alignSelf: 'center',
                        textAlign: "center",
                        marginTop: 30,
                        fontSize: 16,
                        color: '#264653',
                        fontWeight: 'bold'
                    }}>
                        {teaNameToDisplay}
                    </Text>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 14,
                        marginTop: 10,
                        color: '#264653',
                        fontWeight: 'bold'
                    }}>
                        {data.vendor}
                    </Text>

                    <Text style={{textAlign: 'center', marginTop: 5, fontWeight: 'bold', fontSize: 18,}}>
                        {data.weight + 'G'}
                    </Text>


                    <Text style={{
                        color: 'black',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        marginBottom: 20,
                        width: 100,
                        textAlign: 'center',
                        height: 30,
                        textAlignVertical: 'center',
                        borderRadius: 30,
                    }}
                          onPress={() => {
                              if (data.link !== null && data.link !== '') {

                                      if (!validURL(data.link)) {

                                          ToastAndroid.show("Link that was provided cannot be opened", ToastAndroid.LONG)
                                      } else {
                                          return Linking.openURL(data.link)
                                      }

                              } else {
                                  ToastAndroid.show("No Link Was Provided", ToastAndroid.LONG)
                              }
                          }}>
                        Item Link
                    </Text>
                </View>

            </View>
            <View style={styles.historyContainer}>
                <View style={styles.HistoryViewTextView}>
                    <Text style={{fontSize: 34, color: 'white', marginLeft: 10, width: '45%'}}>
                        History
                    </Text>
                    <TouchableOpacity activeOpacity={1}  onPress={()=> {
                        navigation.navigate('DiaryHistoryListing', {searchTerm: null, setParentSearch: null, teaID:route.params.teaID })
                    }} style={{alignSelf: 'flex-end', width: '50%',}}>
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                            textAlign: 'right',
                            textAlignVertical: 'center'
                        }}>
                            More
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.historyView}>
                    <FlatList data={historyItems} style={{height: '100%'}} renderItem={renderItems}


                              keyExtractor={item => item.sessionID}/>


                </View>
            </View>


            <View style={{
                position: "absolute",
                bottom: '10%',
                width: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                flexDirection: 'row'
            }}>

                <TouchableOpacity activeOpacity={1} onPress={() => {setOpenNavigation(!openNavigation)}}>
                    <View style={styles.sessionActionMenu}>
                        <Animated.View style={[{
                            height: 66,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25,
                            width: textInputWidth.interpolate({
                                inputRange: [0, 1],
                                outputRange: [65, 67]
                            }),

                        }, editBackground]}>


                            <AnimatedImage style={{
                                width: iconWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 67]
                                }), height: 67, alignSelf: 'center'
                            }}
                                           source={require('../img/push.png')}/>




                            <AnimatedImage style={{
                                height: 67, width: iconWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [60, 0]
                                }), alignSelf: 'center'
                            }}
                                           source={require('../img/pull.png')}/>

                        </Animated.View>
                        <Animated.View
                            style={[

                                {
                                    height: 66,
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 230]
                                    }),
                                    backgroundColor: '#E9C46A',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',


                                },
                            ]}>


                            <AnimatedTouchable activeOpacity={1} style={{
                                backgroundColor: '#3C91E6',
                                height: 48,

                                width: textInputWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 50]
                                }),
                                borderRadius: 20,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AnimatedTouchable activeOpacity={1} onPress={() => {

                                    navigation.navigate('TeaInventoryEdit', {data, teaID: route.params.teaID})
                                    setOpenNavigation(!openNavigation)
                                }} style={{
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }),
                                }}>
                                    <Image style={{height: '100%', width: '100%'}} source={require('../img/edit.png')}/>
                                </AnimatedTouchable></AnimatedTouchable>
                            <AnimatedTouchable activeOpacity={1} style={{
                                backgroundColor: '#3C91E6',
                                height: 48,

                                width: textInputWidth.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 50]
                                }),
                                borderRadius: 20,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AnimatedTouchable activeOpacity={1} onPress={() => {
                                    if (archived) {
                                        if(data.weight > 0)
                                        {
                                        props.unarchiveTea(route.params.teaID)
                                            navigation.goBack()
                                            }
                                        else {
                                            ToastAndroid.show("Add Tea Weight", ToastAndroid.LONG)
                                        }
                                    } else {
                                        props.archiveTea(route.params.teaID)
                                        navigation.goBack()
                                    }

                                }} style={{
                                    width: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }), height: textInputWidth.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 40]
                                    }),
                                }}>
                                    {archived ? <Image style={{height: '100%', width: '100%'}}
                                                       source={require('../img/unarchive.png')}/> :
                                        <Image style={{height: '100%', width: '100%'}}
                                               source={require('../img/archive.png')}/>}

                                </AnimatedTouchable></AnimatedTouchable>

                        </Animated.View>

                    </View>
                </TouchableOpacity>

            </View>
        </View>


    )
}

const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        colors: TeaAvailable.teaColour,
        wholeDiary: Diary,
        diary: Diary.diaryEntry,
        teaAvailable: TeaAvailable.teaAvailable
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {

    return {

        unarchiveTea: (teaId) => dispatch(unarchiveTea(teaId)),
        archiveTea: (teaId) => dispatch(archiveTea(teaId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeaDetailPage)

