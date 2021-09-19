import Svg, {Circle, Line, Polygon, Text} from "react-native-svg";
import React, {useState} from 'react';
import {View} from "react-native";
import {connect} from "react-redux";

function RadarChart(props) {


    const [viewHeight, setViewHeight] = useState(0)
    const [viewWidth, setViewWidth] = useState(0)
    let radius = 150 * 0.25 * 3;

    let centerX = viewWidth * 0.5;
    let centerY = viewHeight * 0.5
    let degree = 90
    const calculateEdgePoint = (degree) => {
        const degreeInRadians = degToRadians(degree);
        return [
            centerX + Math.cos(degreeInRadians) * radius,
            centerY + Math.sin(degreeInRadians) * radius
        ];
    };
    const calculateEdgePointText = (degree) => {
        const degreeInRadians = degToRadians(degree);
        return [
            centerX + Math.cos(degreeInRadians) * radius * 1.35,
            centerY + Math.sin(degreeInRadians) * radius * 1.2
        ];
    };
    const calculateEdgePointPolygon = (degree, amount) => {
        const degreeInRadians = degToRadians(degree);
        return [
            centerX + Math.cos(degreeInRadians) * ((radius * amount) / 100),
            centerY + Math.sin(degreeInRadians) * ((radius * amount) / 100)
        ];
    };


    const degToRadians = (deg) => {

        return deg * Math.PI / 180
    }


    const drawCircle = () => {
        let data = []
        for (let i = 0; i < 5; i++) {
            data.push(<Circle
                    key={`circle_outline_${i}`}
                    cx={centerX}
                    cy={centerY}
                    r={radius - ((radius * i) / 5)}
                    stroke="black"
                    strokeOpacity="1"
                    strokeWidth="5"
                    fill="transparent"
                />
            )


        }


        let n = Math.round(Object.keys(props.steeps).length / 2)
        for (let i = 0; i < n; i++) {

            data.push(<Line
                    key={`line_outline_${i}`}
                    x1={calculateEdgePoint(degree)[0]}
                    y1={calculateEdgePoint(degree)[1]}
                    x2={calculateEdgePoint(degree + 180)[0]}
                    y2={calculateEdgePoint(degree + 180)[1]}
                    stroke="black"
                    strokeOpacity="1"
                    strokeWidth="5"
                    fill="transparent"
                />
            )


            degree += 180 / n


        }


        const findPoints = () => {
            let sortable = []

            for(const [key, value] of Object.entries(props.steeps))
            {
                sortable.push([key,value])
            }
            sortable.sort(function(a, b) {
                return parseInt(a[0]) - parseInt(b[0]);
            });



            degree = 90
            let size = 100
            let point = ''
            let n = Math.round(Object.keys(props.steeps).length / 2)
            for (let x in sortable) {

                point += `${calculateEdgePointPolygon(degree, sortable[x][1].level * 10)[0]},${calculateEdgePointPolygon(degree + 180, sortable[x][1].level * 10)[1]} `
                data.push(<Text
                    key={`text_outline_${sortable[x]}`} fill="black"
                    x={calculateEdgePointText(degree)[0]}
                    y={calculateEdgePointText(degree + 180)[1]}
                    stroke="black"
                    fontSize="10"
                    textAnchor="middle">
                    {props.flavors[sortable[x][0]].note}

                </Text>)
                degree += 180 / n
            }
            if (Object.keys(props.steeps).length % 2 !== 0) {
                point += `${calculateEdgePointPolygon(degree, 0 * 10)[0]},${calculateEdgePointPolygon(degree + 180, 0 * 10)[1]} `
                degree += 180 / n
            }
            return point
        }

        data.push(<Polygon
                key={'polygon'}
                points={findPoints()}
                fill="lime"
                strokeLinejoin="round"
                stroke="lime"
                strokeWidth="10"
            />
        )

        return data
    }
    return (

        <View style={{height: '100%', width: '100%'}} onLayout={(layout) => {
            const {height, width} = layout.nativeEvent.layout

            if (height > 0 && width > 0) {
                setViewHeight(Math.floor(height))
                setViewWidth(Math.floor(width))
            }

        }}>

            <Svg height={"100%"} width={"100%"}>

                {drawCircle()}


            </Svg>
        </View>
    )


}

const mapStateToProps = (state, ownProps) => {
    const {Diary} = state;

    return {
        flavors: Diary.flavorNotes
    };
};

export default connect(mapStateToProps)(RadarChart);
