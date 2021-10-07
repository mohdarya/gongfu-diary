import React, {useEffect, useState} from 'react';
import {
    FlatList,
    Image,
    Keyboard,
    Linking,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import HistoryItem from "../components/historyItem";
import {connect} from "react-redux";




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

            },       HistoryViewTextView: {
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
                height: '80%',
                marginLeft: 15,
                marginRight: 15,
            },


        })


    const route = useRoute()
    const {data} = route.params
    const [historyItems, setHistoryItems] = useState([])
    useEffect(() => {
        let items = []

        let loopNumber = props.diary.length

        if (loopNumber > 5) {
            loopNumber = 5
        }
        for (let i = 0; i < loopNumber; i++) {
            if(props.diary[props.diary.length - 1 - i].teaID === data.teaID) {
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
    return (



            <View style={styles.container}>
                <View style={styles.topPart}>
                    <View style={styles.topPartBar}>

                    </View>
                    <View style={{ top: '40%',left: '20%',width: '60%', height: 230, backgroundColor: '#E9C46A', borderRadius:50, position: "absolute", alignContent: 'space-around', justifyContent: 'space-around'}}>
                        <Text style={{alignSelf: 'center', textAlign: "center", marginTop: 30, fontSize: 20, color: '#264653', fontWeight: 'bold'}}>
                            {data.teaName}
                        </Text>
                        <Text style={{alignSelf: 'center', fontSize: 17,marginTop: 20, color: '#264653', fontWeight: 'bold'}}>
                            {data.teaName}
                        </Text>

                            <Text style={{textAlign: 'center', marginTop: 7, fontSize: 18,}}>
                                {data.weight + 'G'}
                            </Text>


                        <Text style={{color: 'black', alignSelf: 'center', backgroundColor: 'white', marginBottom: 20, width: 100, textAlign: 'center',height: 30, textAlignVertical: 'center', borderRadius: 30,}}
                              onPress={() => Linking.openURL(data.link)}>
                            Item Link
                        </Text>
                    </View>

                </View>
                <View style={styles.historyContainer}>
                    <View style={styles.HistoryViewTextView}>
                        <Text style={{fontSize: 34, color: 'white', marginLeft: 10, width: '45%'}}>
                            History
                        </Text>
                        <TouchableOpacity style={{alignSelf: 'flex-end', width: '50%',}}>
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
            </View>


    )
}
const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        wholeDiary: Diary,
        diary: Diary.diaryEntry,
        teaAvailable: TeaAvailable.teaAvailable
    };
};
export default connect(mapStateToProps)(TeaDetailPage)

