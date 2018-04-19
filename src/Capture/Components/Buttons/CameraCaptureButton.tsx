import { SFC } from 'react'
import {
    StyleSheet,
    TouchableWithoutFeedback,
    GestureResponderEvent,
} from 'react-native'
import Svg, { Circle, Path } from 'react-native-svg'
import React from 'react'
import arc from 'svg-arc-corners'

const styles = (withShadow: boolean) => {
    return StyleSheet.create({
        capture: {
            flex: 0,
            opacity: 1,
            shadowRadius: 1,
            shadowOffset: { width: 3, height: 3 },
            shadowOpacity: withShadow ? 0.3 : 0,
            shadowColor: '#000',
            marginLeft: 5,
        },
    })
}

const CameraCaptureButtonCompoonent: SFC<{
    recording: boolean
    percentage: number
    handlerDisabled: boolean
    captureHandler: (event: GestureResponderEvent) => void
}> = props => {
    return (
        <TouchableWithoutFeedback
            onPressIn={props.captureHandler}
            onPressOut={props.captureHandler}
            pressRetentionOffset={{
                top: 100,
                left: 100,
                bottom: 100,
                right: 100,
            }}
            disabled={props.handlerDisabled}
        >
            <Svg
                style={styles(!props.recording).capture}
                width="150"
                height="150"
            >
                <Circle
                    cx="75"
                    cy="75"
                    r={props.recording ? '50' : '35'}
                    stroke="white"
                    strokeWidth="5"
                    strokeOpacity="1"
                    fill="transparent"
                />
                <Path
                    d={arc([75, 75], 70, 0, props.percentage || 0, 10, 20)}
                    fill="red"
                    fillOpacity={props.recording ? 0.9 : 0}
                />
            </Svg>
        </TouchableWithoutFeedback>
    )
}

export default CameraCaptureButtonCompoonent
