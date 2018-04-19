import * as React from 'react'

import Camera from '../Components/Camera'
import CameraNotAuthorizedView from './CameraNotAuthorized'

export default class CameraView extends React.PureComponent<{}, {}> {
    render() {
        return (
            <Camera
                captureFinishedHandler={() => {
                    console.log(`capture finished`)
                }}
                notAuthorizedView={<CameraNotAuthorizedView />}
            />
        )
    }
}
