adb devices
adb shell input keyevent 82
adb -s XEDDU18202029736 reverse tcp:8081 tcp:8081
react-native start --reset-cache

expo r -c --config ./mobile/app.json

- Запуск дев режима для сайта - 'npm run web-dev (env-dev)'
- Запуск прод режима для сайта - 'npm run web-build (env-prod) && npm start'