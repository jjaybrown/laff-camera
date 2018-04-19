import { SFC } from 'react'
import { View, Text } from 'react-native'
import React from 'react'

const CameraNotAuthorizedView: SFC<{}> = () => {
    return (
        <View style={{ backgroundColor: '#4568b7', flex: 1 }}>
            <Text style={{ color: '#fff' }}>Nothing to see here</Text>
        </View>
    )
}

export default CameraNotAuthorizedView
