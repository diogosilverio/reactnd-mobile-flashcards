# Udacity - React Nanodegree

## Flashcards Project (Android)

This project was developed in fulfillment of React Nanodegree - React Native module

## Requirements

The main dependencies and tools used for this project are the following:

* Nodejs 8.x
* Yarn 1.3.x
* create-react-native-app 1.0.0
* React 16.x
* React Redux 5.x
* React Native 0.50.x
* React Navigation 1.0.0b
* Expo 23.x
* Redux 3.7.x
* Android Phone as mobile device
* Android Studio / SDK for emulator

To ensure the perfect execution of this project, please follow the instructions in the next sections.

## Installing Expo

* Visit [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) page at Google's Play and install it  on your Android device

## Installing Yarn
Yarn is prefered as package manager for this project.

Proceed to [Yarn Installation](https://yarnpkg.com/lang/en/docs/install/) and choose the suitable installing according to your OS.

After the process is done, check if everyting is ok by verifying the version:

```
host$ yarn --version
1.3.2
```

If the ouput shows version 1.3.x, it is time to start preparing the project!

_If you need more information, please check the [Usage](https://yarnpkg.com/en/docs/usage) guide._

## Preparing The Project

* Clone this repository to a folder of your preference
* Change the working directory to the project
* Install all dependencies by asking yarn to install them:
```
$ yarn install
yarn install v1.3.2
[1/4] Resolving packages...
[2/4] Fetching packages...
...
success Saved lockfile.
Done in 24.73s.

```

## Running Flashcards

Now that you device is ready and all dependencies installed, we just need to start the React Native App.

* Send a start command to yarn:
```
$ yarn start
yarn run v1.3.2
$ react-native-scripts start
13:03:14: Starting packager...
```
* It may take a while, but as soon as the process is finished, a QRCode will be displayed along with a URL
* Access your Expo device app and select **Scan QR Code** and point your camera to the QR Code
* The project's javascript bundle will now be built and this may take a few seconds according to you machine specs
* When the process is done, the app will be displayed on you device's screen
