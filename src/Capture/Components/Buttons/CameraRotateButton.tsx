import { SFC } from 'react'
import { View } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import React from 'react'

const CameraRotateButtonComponent: SFC<{}> = () => {
    return (
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
                size={40}
                color="#fff"
                style={{ marginLeft: 0 }}
            />
        </View>
    )
}

export default CameraRotateButtonComponent
