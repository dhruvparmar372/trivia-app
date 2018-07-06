# Trivia App

Mobile application for taking a quiz of 10 True/False questions against OpenTrivia DB (https://opentdb.com). It's built using
ReactNative and has both iOS and Android versions. The Android version can be downloaded from `distribution/app-release.apk` path in the repository. 

All quizzes that the user takes are stored locally on the device and user can view scores of previous quizzes under `High Scores` section.

### Tech Stack
1. **React Native**
2. **Redux** - for state management
3. **Redux Sagas** - for managing async actions and effects
4. **I18n** - translations
5. **Axios** - as http client
6. **React Navigation**
7. **Redux Persist** - for adding offline capabilities
8. **Jest** - for snapshot testing of reducers, actions, utility methods and leaf components.

### App Screns

#### Intro
![Intro Screen](https://i.imgur.com/zeR2wac.png)

#### Quiz
![Quiz Screen](https://i.imgur.com/VEHVKDG.png)

#### Quiz Result
![Quiz Result Screen](https://i.imgur.com/vGG5cIT.png)

#### HighScores
![High Scores Screen](https://i.imgur.com/XDMO93D.png)
