adb devices
adb shell input keyevent 82
adb -s XEDDU18202029736 reverse tcp:8081 tcp:8081
react-native start --reset-cache
react-native run-android
react-native run-android --no-jetifier
react-native clean-project-auto - только в bash

Loading dependency graph done - открыть приложение на телефоне

expo r -c --config ./mobile/app.json

- Запуск дев режима для сайта - 'npm run web-dev (env-dev)'
- Запуск прод режима для сайта - 'npm run web-build (env-prod) && npm start'

 // прОТЕСТИРОВАть signin
  // при разлогине удалять из бд
  // разлогинивать если ассеss токен вышел из строя