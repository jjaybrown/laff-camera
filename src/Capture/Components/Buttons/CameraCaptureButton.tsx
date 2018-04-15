import { SFC } from 'react'
import {
    StyleSheet,
    TouchableWithoutFeedback,
    GestureResponderEvent,
} from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import React from 'react'

const styles = StyleSheet.create({
    capture: {
        flex: 0,
        marginBottom: 30,
        opacity: 1,
    },
})

const CameraCaptureButtonCompoonent: SFC<{
    recording: boolean
    captureHandler: (event: GestureResponderEvent) => void
}> = props => {
    return (
        <TouchableWithoutFeedback onPress={props.captureHandler}>
            <Svg style={styles.capture} width="85" height="100">
                <Circle
                    cx="45"
                    cy="45"
                    r={props.recording ? '40' : '35'}
                    stroke={props.recording ? '#c71f16' : 'white'}
                    strokeWidth="6"
                    fill={props.recording ? '#c71f16' : 'transparent'}
                    fillOpacity="1"
                    strokeOpacity={props.recording ? '0' : '1'}
                />
            </Svg>
        </TouchableWithoutFeedback>
    )
}

export default CameraCaptureButtonCompoonent
