import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";

function InventoryItem(props) {

    const styles = StyleSheet.create({
        container: {
            height: 165,
            width: 110,
            borderRadius: 32,
            backgroundColor: '#3C91E6',


        }, nameContainer: {
            alignSelf: 'center',
            height: 'auto',
            width: '85%',


        },
        circleView: {
            marginTop: 10,
            marginBottom: 5,
            alignSelf: 'center',
            borderRadius: 100,
            backgroundColor: 'white',
            borderWidth: 10,
            borderColor: '#585858',
            height: 90,
            width: 90,
            justifyContent: 'center',

        }


    })

    let name = ''


        if(props.data.teaName.length <= 20)
        {
            name = props.data.teaName
        }
        else {
            name = props.data.teaName.substring(0, 20) + ' ...'
        }

        const navigation = useNavigation();
    return (

        <TouchableOpacity activeOpacity={1} disabled={props.turnOff} onPress={() => {

            navigation.navigate('TeaDetail', {data: props.data})
        }} style={styles.container}>

               <View style={styles.circleView}>
                  <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>
                      {props.data.weight + ' G'}
                    </Text>
                </View>


            <View style={styles.nameContainer}>
                <Text style={{textAlignVertical: 'center',height: '50%', color: 'white', fontSize: 13, textAlign: 'center',}}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>
    )

}

export default InventoryItem
