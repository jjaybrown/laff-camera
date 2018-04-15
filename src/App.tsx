import * as React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import { RNCamera } from 'react-native-camera'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'

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
            <View style={styles.container}>
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
                    <View
                        style={{
                            paddingVertical: 6,
                            paddingHorizontal: 6,
                            opacity: 0.8,
                            margin: 10,
                            borderWidth: 0,
                            borderColor: '#fff',
                            borderRadius: 35,
                        }}
                    >
                        <FeatherIcon name="delete" size={35} color="#fff" />
                    </View>
                    <View
                        style={{
                            paddingVertical: 6,
                            paddingHorizontal: 6,
                            opacity: 0.8,
                            margin: 10,
                            borderWidth: 0,
                            borderColor: '#fff',
                            borderRadius: 35,
                        }}
                    >
                        <FeatherIcon
                            name="arrow-right"
                            size={35}
                            color="#fff"
                        />
                    </View>
                    <View
                        style={{
                            paddingVertical: 6,
                            paddingHorizontal: 6,
                            opacity: 0.8,
                            margin: 10,
                            borderWidth: 0,
                            borderColor: '#fff',
                            borderRadius: 35,
                        }}
                    >
                        <FeatherIcon name="image" size={35} color="#fff" />
                    </View>
                    <View
                        style={{
                            paddingVertical: 6,
                            paddingHorizontal: 6,
                            opacity: 0.8,
                            margin: 10,
                            borderWidth: 0,
                            borderColor: '#fff',
                            borderRadius: 35,
                        }}
                    >
                        <FeatherIcon
                            name="refresh-cw"
                            size={30}
                            color="#fff"
                            style={{ marginLeft: 0 }}
                        />
                    </View>
                    <View
                        style={{
                            paddingVertical: 6,
                            paddingHorizontal: 6,
                            opacity: 0.8,
                            margin: 10,
                            borderWidth: 0,
                            borderColor: '#fff',
                            borderRadius: 35,
                        }}
                    >
                        <MaterialIcon
                            name="flash-on"
                            size={35}
                            color="#fff"
                            style={{ marginLeft: 0 }}
                        />
                    </View>
                    <View
                        style={{
                            paddingVertical: 6,
                            paddingHorizontal: 5,
                            opacity: 0.5,
                            margin: 10,
                            borderWidth: 0,
                            borderColor: '#fff',
                            borderRadius: 35,
                        }}
                    >
                        <MaterialIcon
                            name="flash-off"
                            size={35}
                            color="#fff"
                            style={{ marginLeft: 3 }}
                        />
                    </View>
                    <TouchableWithoutFeedback onPress={this.capture}>
                        <Svg style={styles.capture} width="85" height="100">
                            <Circle
                                cx="45"
                                cy="45"
                                r={this.state.recording ? '40' : '35'}
                                stroke={
                                    this.state.recording ? '#c71f16' : 'white'
                                }
                                strokeWidth="6"
                                fill={
                                    this.state.recording
                                        ? '#c71f16'
                                        : 'transparent'
                                }
                                fillOpacity="1"
                                strokeOpacity={this.state.recording ? '0' : '1'}
                            />
                        </Svg>
                    </TouchableWithoutFeedback>
                </RNCamera>
            </View>
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
