import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { RNCamera, RNCameraProps } from 'react-native-camera'

import FlashButtonCompoonent from '../Components/Buttons/FlashButton'
import MediaLibraryButtonComponent from '../Components/Buttons/MediaLibraryButton'
import CameraRotateButtonComponent from '../Components/Buttons/CameraRotateButton'
import CameraCaptureButtonCompoonent from '../Components/Buttons/CameraCaptureButton'

interface CameraProps extends RNCameraProps {
    captureFinishedHandler?: Function
}

interface CameraState {
    recording: boolean
    percentage: number
    flashActive: boolean
    captureDisabled: boolean
    cameraMode: CameraMode
}

enum CameraMode {
    FRONT,
    BACK,
}

export default class Camera extends React.PureComponent<
    CameraProps,
    CameraState
> {
    private camera: any
    private recordingTimer: any
    private recordingTimeElapsed: number

    constructor(props) {
        super(props)
        this.state = {
            recording: false,
            percentage: 0,
            flashActive: false,
            captureDisabled: false,
            cameraMode: CameraMode.BACK,
        }

        this.capture = this.capture.bind(this)
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    {...this.props}
                    ref={ref => {
                        this.camera = ref
                    }}
                    style={styles.preview}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    type={
                        this.state.cameraMode === CameraMode.BACK
                            ? RNCamera.Constants.Type.back
                            : RNCamera.Constants.Type.front
                    }
                    flashMode={
                        this.state.flashActive
                            ? RNCamera.Constants.FlashMode.torch
                            : RNCamera.Constants.FlashMode.off
                    }
                >
                    <View style={styles.cameraControlsTop}>
                        <FlashButtonCompoonent
                            active={this.state.flashActive}
                            activationHandler={this.flashToggle}
                            hidden={this.state.cameraMode !== CameraMode.BACK}
                        />
                    </View>
                    <View style={styles.cameraControlsBottom}>
                        <CameraRotateButtonComponent
                            rotationHandler={this.changeCameraMode}
                        />
                        <CameraCaptureButtonCompoonent
                            captureHandler={this.capture}
                            recording={
                                this.state.recording &&
                                !this.state.captureDisabled
                            }
                            percentage={this.state.percentage * 360}
                            handlerDisabled={this.state.captureDisabled}
                        />
                        <MediaLibraryButtonComponent />
                    </View>
                </RNCamera>
            </View>
        )
    }

    capture = async () => {
        if (this.camera) {
            this.setState({
                recording: !this.state.recording,
            })

            if (!this.state.recording) {
                this.recordingTimeElapsed = 0
                clearInterval(this.recordingTimer)
                this.recordingTimer = setInterval(() => {
                    this.recordingTimeElapsed += 1

                    const percentage = this.recordingTimeElapsed / 480
                    if (percentage >= 1) {
                        this.__resetCaptureAnimation()
                    }

                    this.setState({
                        percentage: percentage,
                    })
                }, 50)
            } else {
                this.__resetCaptureAnimation()
            }

            // const options = { quality: 0.5, base64: true }
            // const data = await this.camera.takePictureAsync(options)
            // console.log(data.uri)
        }
    }

    flashToggle = () => {
        if (this.camera) {
            this.setState({
                flashActive: !this.state.flashActive,
            })
        }
    }

    changeCameraMode = () => {
        this.setState({
            flashActive: false,
            cameraMode:
                this.state.cameraMode === CameraMode.BACK
                    ? CameraMode.FRONT
                    : CameraMode.BACK,
        })
    }

    private __resetCaptureAnimation = () => {
        clearInterval(this.recordingTimer)

        this.recordingTimeElapsed = 0
        this.setState({ percentage: 0, captureDisabled: true })

        setTimeout(() => {
            this.setState({ captureDisabled: false })
        }, 2000)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    cameraControlsTop: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    cameraControlsBottom: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignContent: 'space-between',
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        flexDirection: 'column',
    },
})
