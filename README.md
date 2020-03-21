# React Native multiple image picker

### Expo solution working on Android and IOS

![Screenshot](https://github.com/kristijanPetr/RN-multiple-image-picker/raw/master/images/android.png)
![Screenshot](https://github.com/kristijanPetr/RN-multiple-image-picker/raw/master/images/ios.png)

## Installation

- `yarn add expo-multiple-media-picker`

## Usage

```jsx
{this.state.imageBrowser ? (
    <ImageBrowser
        onRequestClose={this.toggleModal}
        pickedImages={this.handleImages}
    />
)}

```

## Running example

- `cd example && expo start`

## Props

### ImageBrowser component takes 4 props

- pickedImages?: Array, of selected images
- onRequestClose?: () => any,
- maxImages: Number, Optional param to specify max number of shown images
- style: Object,
