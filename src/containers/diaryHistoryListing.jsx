import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/core";
import {connect} from "react-redux";
import {resetCurrentTeaData} from "../action/currentTeaAction";
import {resetDiaryData} from "../action/diaryEntryAction";
import HistoryItem from "../components/historyItem";

function DiaryHistoryListing(props) {


    const navigation = useNavigation();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#264653',


        },
        welcomeText: {
            fontSize: 30,
            color: 'white',
            marginLeft: 20,
            marginBottom: 20,
            marginRight: 15,
            marginTop: 50,
            fontWeight: 'bold'
        }, doneButton: {
            backgroundColor: '#E9C46A',
            width: 100,
            height: 50,
            borderRadius: 10,
            justifyContent: 'center',
            alignContent: 'center',
        },
        doneButtonText: {
            textAlign: 'center',
            bottom: '5%',
            fontWeight: 'bold',
            fontSize: 30,
            color: '#264653',
        },


    });

    const route = useRoute()
    const [searchTerm, setSearchTerm] = useState(route.params.searchTerm)
    const [data, setData] = useState(() => {
        if (searchTerm !== null) {


            return Object.entries(props.diary).filter(([key, value]) => {


                return parseInt(value.teaID) === searchTerm
            })


        } else {
            return Object.entries(props.diary).filter(([key, value]) => {


                return true
            })
        }
    })


    console.log(data)

    return (
        <View style={styles.container}>


            <View style={{flex: 1}}>


                <Text style={styles.welcomeText}>
                    History
                </Text>

                <View style={{height: '90%', width: '90%', alignSelf: 'center',}}>


                    <FlatList data={data} renderItem={({item}) => {

                        return(
                            <HistoryItem key={`historyItem${item[1].sessionID}`} data={item[1]}/>
                        )
                    }}
                              keyExtractor={item => item[1].sessionID}/>
                </View>
            </View>


        </View>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        resetDiary: () => dispatch(resetDiaryData()),
        resetTeaInventory: () => dispatch(resetCurrentTeaData())
    };
};

const mapStateToProps = (state, ownProps) => {
    const {Diary, TeaAvailable} = state;

    return {
        weeklySession: TeaAvailable.weeklySession,
        wholeDiary: Diary,
        diary: Diary.diaryEntry,
        teaAvailable: TeaAvailable.teaAvailable
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DiaryHistoryListing)

