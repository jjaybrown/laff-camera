import { SFC } from 'react'
import { View } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import React from 'react'

const DeleteButtonComponent: SFC<{}> = () => {
    return (
        <View
            style={{
                paddingVertical: 6,
                paddingHorizontal: 6,
                opacity: 0.8,
                margin: 10,
            }}
        >
            <FeatherIcon name="delete" size={35} color="#fff" />
        </View>
    )
}

export default DeleteButtonComponent
