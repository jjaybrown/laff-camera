import * as React from 'react'
import { View } from 'react-native'

import CameraPreview from '../Components/CameraPreview'
import Camera from '../Components/Camera'
import CameraNotAuthorizedView from './CameraNotAuthorized'

export default class CameraView extends React.PureComponent<
    {},
    { uri: string | null }
> {
    constructor(props) {
        super(props)
        this.state = {
            uri: null,
        }
    }

    render() {
        const preview = this.state.uri ? (
            <CameraPreview
                uri={this.state.uri}
                onBackHandler={() => {
                    this.setState({ uri: null })
                }}
                onSendHandler={() => {
                    this.setState({ uri: null })
                }}
            />
        ) : (
            <React.Fragment />
        )

        return (
            <View style={{ flex: 1 }}>
                {preview}
                <View
                    style={{
                        flex: 1,
                        display: this.state.uri ? 'none' : 'flex',
                    }}
                >
                    <Camera
                        captureFinishedHandler={uri => {
                            this.setState({ uri })
                        }}
                        notAuthorizedView={<CameraNotAuthorizedView />}
                    />
                </View>
            </View>
        )
    }
}
