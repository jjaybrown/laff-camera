import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { RNCamera } from 'react-native-camera'

import FlashButtonCompoonent from '../Components/Buttons/FlashButton'
import MediaLibraryButtonComponent from '../Components/Buttons/MediaLibraryButton'
import CameraRotateButtonComponent from '../Components/Buttons/CameraRotateButton'
import CameraCaptureButtonCompoonent from '../Components/Buttons/CameraCaptureButton'

import CameraNotAuthorizedView from './CameraNotAuthorized'

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

export default class CameraView extends React.PureComponent<
    {},
    {
        recording: boolean
        percentage: number
        flashActive: boolean
        captureDisabled: boolean
    }
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
            this.setState({ recording: !this.state.recording })

            if (!this.state.recording) {
                this.recordingTimeElapsed = 0
                clearInterval(this.recordingTimer)
                this.recordingTimer = setInterval(() => {
                    this.recordingTimeElapsed += 1

                    const percentage = this.recordingTimeElapsed / 480
                    if (percentage >= 1) {
                        clearInterval(this.recordingTimer)
                        this.recordingTimeElapsed = 0
                        this.setState({
                            percentage: 0,
                            captureDisabled: true,
                        })

                        setTimeout(() => {
                            this.setState({
                                captureDisabled: false,
                            })
                        }, 2000) // Timeout should be replaced by a function to handle the upload of the video
                    }

                    this.setState({
                        percentage: percentage,
                    })
                }, 50)
            } else {
                clearInterval(this.recordingTimer)

                this.recordingTimeElapsed = 0
                this.setState({
                    percentage: 0,
                    captureDisabled: true,
                })

                setTimeout(() => {
                    this.setState({ captureDisabled: false })
                }, 2000)
            }

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
