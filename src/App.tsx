import * as React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import { RNCamera } from 'react-native-camera'

import Svg, { Circle } from 'react-native-svg'

export interface Props {}
export interface State {}

class CameraNotAuthorizedView extends React.Component<Props, State> {
    render() {
        return (
            <View style={{ backgroundColor: '#4568b7', flex: 1 }}>
                <Text style={{ color: '#fff' }}>Nothing to see here</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        height: 120,
        width: 100,
        marginBottom: 30,
        opacity: 1,
    },
})

class Camera extends React.Component<Props, { recording: boolean }> {
    public camera: any

    constructor(props) {
        super(props)
        this.state = {
            recording: false,
        }

        this.capture = this.capture.bind(this)
    }

    render() {
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.off}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={
                    'We need your permission to use your camera phone'
                }
                notAuthorizedView={<CameraNotAuthorizedView />}
            >
                <TouchableWithoutFeedback onPress={this.capture}>
                    <Svg style={styles.capture} width="100" height="120">
                        <Circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke={this.state.recording ? 'red' : 'white'}
                            strokeWidth="10"
                            fill={this.state.recording ? 'red' : 'transparent'}
                        />
                    </Svg>
                </TouchableWithoutFeedback>
            </RNCamera>
        )
    }

    capture = async function() {
        if (this.camera) {
            this.setState({ recording: !this.state.recording })
            // const options = { quality: 0.5, base64: true }
            // const data = await this.camera.takePictureAsync(options)
            // console.log(data.uri)
        }
    }
}

export default class App extends React.Component<Props, State> {
    render() {
        return <Camera />
    }
}
