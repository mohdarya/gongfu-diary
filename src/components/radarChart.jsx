import Svg, {Circle, Line} from "react-native-svg";
import React, {useState} from 'react';
import {View} from "react-native";

function RadarChart(props){

     const [viewHeight ,setViewHeight] = useState(0)
    const [viewWidth, setViewWidth] = useState(0)
    let radius = 180  * 0.25;
    let degree = 45;
    const calculateEdgePoint = (center) => {
        const degreeInRadians = degToRadians(degree);
        return [
            center + Math.cos(degreeInRadians) * radius,
            center + Math.sin(degreeInRadians) * radius
        ];
    };


    const degToRadians = (deg) =>
    {

        return deg * (Math.PI / 180);
    }


    const drawCircle = () => {
        let data = []
        for( let i = 0; i < 3; i++){
            data.push(  <Circle
                    key={`circle_outline_${i}`}
                    cx={viewWidth * 0.5}
                    cy={viewHeight * 0.47}
                    r={(i + 1) * radius }
                    stroke="black"
                    strokeOpacity="1"
                    strokeWidth="5"
                    fill="transparent"
                />
            )


        }


        return data
    }
    return(

        <View style={{height: '100%', width: '100%'}} onLayout={(layout) => {
            const {height, width} = layout.nativeEvent.layout

            if(height > 0  && width > 0) {
                setViewHeight(Math.floor(height))
                setViewWidth(Math.floor(width))
            }

        }}>

            <Svg height={"100%"} width={"100%"}>

                {drawCircle()}
                <Line
                    key={'test'}
                    x1={10}
                    y1={0}
                    x2={viewWidth - 20}
                    y2={viewHeight - 20}
                    stroke="black"
                    strokeOpacity="1"
                    strokeWidth="5"
                    fill="transparent"
                />
            </Svg>
        </View>
    )



}

export default RadarChart
