import { SFC } from 'react'
import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import Video from 'react-native-video'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'

const CameraPreview: SFC<{
    uri: string | null
    onBackHandler: () => void
    onSendHandler: () => void
    onDownloadHandler?: () => void
}> = (props: {
    uri: string | null
    onBackHandler: () => void
    onSendHandler: () => void
    onDownloadHandler?: () => void
}) => {
    return (
        <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 0 }}>
            <TouchableWithoutFeedback
                onPress={props.onBackHandler}
                style={{
                    opacity: 0.8,
                    margin: 10,
                    shadowRadius: 3,
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: 0.8,
                    shadowColor: '#000',
                }}
            >
                <EvilIconsIcon name="chevron-left" size={50} color="white" />
            </TouchableWithoutFeedback>
            <View
                style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 15,
                    backgroundColor: '#40b3ed',
                    padding: 15,
                    borderRadius: 30,
                    shadowRadius: 3,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.5,
                    shadowColor: '#000',
                }}
            >
                <TouchableWithoutFeedback onPress={props.onSendHandler}>
                    <FontAwesomeIcon
                        name="paper-plane"
                        size={25}
                        color="white"
                        style={{ marginLeft: -3, paddingRight: 3 }}
                    />
                </TouchableWithoutFeedback>
            </View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 15,
                    left: 15,
                    opacity: props.onDownloadHandler ? 1 : 0,
                }}
            >
                <TouchableWithoutFeedback
                    onPress={props.onDownloadHandler}
                    style={{
                        opacity: 0.8,
                        shadowRadius: 3,
                        shadowOffset: { width: 3, height: 3 },
                        shadowOpacity: 0.6,
                        shadowColor: '#000',
                    }}
                >
                    <FeatherIcon name="download" size={30} color="white" />
                </TouchableWithoutFeedback>
            </View>
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: -1,
                    backgroundColor: 'red',
                }}
            />
            <Video
                source={{ uri: props.uri }}
                rate={1.0}
                volume={1.0}
                muted={false}
                paused={false}
                resizeMode="cover"
                repeat={true}
                playInBackground={false}
                playWhenInactive={false}
                ignoreSilentSwitch={'obey'}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    zIndex: -1,
                    opacity: 1,
                }}
            />
        </View>
    )
}

export default CameraPreview
