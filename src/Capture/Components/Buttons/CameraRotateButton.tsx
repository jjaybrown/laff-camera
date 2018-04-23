import {
    Animated,
    View,
    TouchableWithoutFeedback,
    GestureResponderEvent,
} from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import React from 'react'

class CameraRotateButtonComponent extends React.PureComponent<
    {
        rotationHandler: (event: GestureResponderEvent) => void
    },
    { animation: Animated.Value }
> {
    constructor(props) {
        super(props)

        this.state = { animation: new Animated.Value(0) }
    }

    rotate(event: GestureResponderEvent) {
        this.props.rotationHandler(event)
        this.state.animation.setValue(0)
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 500,
        }).start()
    }

    render() {
        const AnimatedFeatherIcon = Animated.createAnimatedComponent(
            FeatherIcon,
        )

        return (
            <TouchableWithoutFeedback onPress={this.rotate.bind(this)}>
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
                    <AnimatedFeatherIcon
                        name="refresh-cw"
                        size={40}
                        color="#fff"
                        style={{
                            transform: [
                                {
                                    rotateZ: this.state.animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '180deg'],
                                    }),
                                },
                                { perspective: 1000 },
                            ],
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default CameraRotateButtonComponent
