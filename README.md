#  ReactOcadCanvasApp
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

## Build

**Warning** Build requies a `.env` file in the root directory with the following:

```
APP_URL=https://canvas.ocadu.ca/api/v1/
TOKEN=
```
For development (or without OAUTH implementation for testing) put access token in .env file. Client ID & Secret should probably go in here too.

Run iOS:
```react-native run-ios```

Run Android:
```react-native run-android```

## AppDelegate.m

Highly recommend uncommenting this line

```
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

and commenting the line below it to run product-like app on other phones.