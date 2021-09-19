import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import DiaryListingItem from "./diaryListingItem";

function DiaryListingSection(props) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'grey',

        },
        textStyle: {
            textAlign: 'center',
            fontSize: 16,

            fontWeight: 'bold'
        }

    })

    const renderDiaryItem = ({item}) => {
        console.log(item)
        return(

        <DiaryListingItem data={item}/>
            )
    }
    return (

        <View style={styles.container}>
            <FlatList data={props.diary}
                      horizontal={false}
                      numColumns={2}
                      renderItem={renderDiaryItem}
                      keyExtractor={item => item.sessionID}/>


        </View>
    )


}


const mapStateToProps = (state, ownProps) => {
    const {Diary} = state;

    return {
        diary: Diary.diaryEntry
    };
};
export default connect(mapStateToProps)(DiaryListingSection)
