import { SFC } from 'react'
import { View } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import React from 'react'

const MediaLibraryButtonComponent: SFC<{}> = () => {
    return (
        <View
            style={{
                paddingVertical: 6,
                paddingHorizontal: 6,
                opacity: 0.9,
                margin: 10,
                shadowRadius: 3,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.1,
                shadowColor: '#000',
            }}
        >
            <FeatherIcon name="copy" size={45} color="#fff" />
        </View>
    )
}

export default MediaLibraryButtonComponent
