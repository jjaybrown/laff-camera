import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { RNCamera } from 'react-native-camera'

import DeleteButtonComponent from './Capture/Components/Buttons/DeleteButton'
import FlashButtonCompoonent from './Capture/Components/Buttons/FlashButton'
import ProceedButtonCompoonent from './Capture/Components/Buttons/ProceedButton'
import MediaLibraryButtonComponent from './Capture/Components/Buttons/MediaLibraryButton'
import CameraRotateButtonComponent from './Capture/Components/Buttons/CameraRotateButton'
import CameraCaptureButtonCompoonent from './Capture/Components/Buttons/CameraCaptureButton'

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
        flexDirection: 'column',
    },
})

class Camera extends React.Component<
    Props,
    { recording: boolean; flashActive: boolean }
> {
    public camera: any

    constructor(props) {
        super(props)
        this.state = {
            recording: false,
            flashActive: false,
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
                    flashMode={
                        this.state.flashActive
                            ? RNCamera.Constants.FlashMode.torch
                            : RNCamera.Constants.FlashMode.off
                    }
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={
                        'We need your permission to use your camera phone'
                    }
                    notAuthorizedView={<CameraNotAuthorizedView />}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                        }}
                    >
                        {/* <DeleteButtonComponent />
                        <ProceedButtonCompoonent />
                        <MediaLibraryButtonComponent />
                        <CameraRotateButtonComponent /> */}
                        <FlashButtonCompoonent
                            active={this.state.flashActive}
                            activationHandler={this.flashToggle}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            alignContent: 'space-between',
                            flexDirection: 'row',
                        }}
                    >
                        <CameraRotateButtonComponent />
                        <CameraCaptureButtonCompoonent
                            captureHandler={this.capture}
                            recording={this.state.recording}
                        />
                        <MediaLibraryButtonComponent />
                    </View>
                </RNCamera>
            </View>
        )
    }

    capture = async () => {
        if (this.camera) {
            this.setState({ recording: !this.state.recording })
            // const options = { quality: 0.5, base64: true }
            // const data = await this.camera.takePictureAsync(options)
            // console.log(data.uri)
        }
    }

    flashToggle = () => {
        if (this.camera) {
            this.setState({ flashActive: !this.state.flashActive })
        }
    }
}

export default class App extends React.Component<Props, State> {
    render() {
        return <Camera />
    }
}
