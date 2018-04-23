# Example camera application using react-native-camera

An experiemental application to test the limits of [react-native-camera](https://github.com/react-native-community/react-native-camera)

Application provides a boilerplate UI which includes:

*   Capture video (30 seconds in duration)
*   Flip camera (back/front)
*   Torch
*   Media library (icon only)
*   Capture preview

## Getting started

`yarn | npm install && react-native-link`

You should follow the standard react-native installation guide: https://facebook.github.io/react-native/docs/getting-started.html

## Commands

`yarn ios` - runs iOS simulator and launches application in debug mode

`yarn android` - runs Android simulator and launches application in debug mode

To run project on a device you should open the project files within iOS or android folder respectively.

## Known issues

*   `react-native-camera` adjusts exposure rapidly when starting capture - [issue here](https://github.com/react-native-community/react-native-camera/pull/1397)
*   Capturing using front facing camera results in a mirrored preview

## Improvements

*   Use [immerjs](https://github.com/mweststrate/immer) to produce new states for Camera Component
*   Introduce React 16 Context actions and reducers (with immerjs) to modify camera operations
*   TESTS!!!
