<img src='./media/logo.png' alt='Pomodoro Timer Logo' title='Pomodoro Timer' height='200'/>

# PomodoroTimer

As my 1st project in [React Native](https://facebook.github.io/react-native/) for [CS50 Mobile](https://courses.edx.org/courses/course-v1:HarvardX+CS50M+Mobile/course/) I had to implement a Pomodoro Technique Timer. Basically, you set a *Work* and *Rest* timer to some number of minutes and then the app switches between them while you work on a task. There are [multiple ways](https://en.wikipedia.org/wiki/Pomodoro_Technique) how you can mix the timers and use not just two, but I have decided to implement the basic one. 

<p align="center">
    <img src='./media/screenshot.png' alt='Screenshot' height='700'/>
</p>

## Table of contents

-   [Idea](#idea)
-   [App.js](#app)
    - [Imports](#imports)
    - [Styles](#styles)
    - [State](#state)
    - [TimePickerHandlers](#TimePickerHandlers)
    - [startTimer()](#startTimer)
    - [stopTimer()](#stopTimer)
    - [pauseTimer()](#pauseTimer)
    - [resetTimer()](#resetTimer)
    - [decreaseTimer()](#decreaseTimer)
    - [displayTimer()](#displayTimer)
    - [render()](#render)
-   [TimePicker.js](#timePicker)
-   [Credits](#credits)

## Idea

Before implementing the in React Native I took a pen and a piece of paper and made a little draft of the app. 

So my app needs the following components: 

-   Logo :tomato:
-   Timer Display (Should change color, based on the timer type (*Work*/*Rest*))
-   Some control for each timer to set it up
-   Play/Pause button 
-   Reset button

So I have decided to implement the Logo, Timer Dsiplay, Play/Pause/Reset buttons in [App.js](./App.js) and the set up control in a separate [TimePicker](./TimerPicker.js) component, beacuse it is identical for both timers

<a href='https://expo.io'>
    <img src='./media/expo_logo.png' alt='Expo' title='Expo' align='right' height='80'/>
</a>

## App

I am using [Expo](https://github.com/expo/expo) as my developing tools for React Native as well as some of their pretty libraries. 

### Imports

So, in my main [App.js](./App.js) I first import some predefined and common components and also my own [TimePicker](./TimerPicker.js).

```javascript
import React from 'react'
import {View, Text, Button, StyleSheet, Image, TouchableOpacity, Vibration} from 'react-native'
import Constants from 'expo-constants'
import TimePicker from './TimePicker.js'
```

### Styles

Then I make some styles using `StyleSheet.create()` function. I have not used all the definedd styles, so let me crarify things here.

- `appContainer` - defines just the overall look of my App
- `timerSetContainer` - is used for two [TimePicker](./TimerPicker.js) components and Play/Pause buttons
- `imgActive` and `imgInactive` - used for Images of Play/Pause buttons
- `touchButton` - used for Play/Pause button component itself

```javascript
const styles = StyleSheet.create({
  appContainer: {
    flex: 1, 
    backgroundColor: '#fab1a0',
  },
  timerContainer: {
    marginTop: "4%",
  },
  timerSetContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: "10%",
  },
  imgActive: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: Constants.statusBarHeight,
  },
  imgInactive: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    opacity: 0.2,
    marginTop: Constants.statusBarHeight,
  },
  touchButton: {
    alignSelf: 'center',
    marginTop: "10%",
    marginRight: 150, 
    marginLeft: 150, 
  },
  timerPosition: {
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
  }
})
```

I also predefined as global constants the colors for Work/Rest timers' text.

- Work: ![#ED4C67](https://placehold.it/20/ED4C67/000000?text=+)
- Rest: ![#D980FA](https://placehold.it/20/D980FA/000000?text=+)

```javascript
const colorWork = '#ED4C67' 
const colorRest = '#D980FA'
```

### State

Looking at `App` class, I first  defined some `state` variables.

- `time` - current time
- `start` - start time (depends on the type of the timer at hand)
- `color` - initial color of the timer display text 
- `valueWorkTimer` - value the user picks for the Work Timer through [TimePicker](./TimerPicker.js) component
- `valueRestTimer` - value the user picks for the Rest Timer through [TimePicker](./TimerPicker.js) component
- `isOn` - boolean var for checking if the App's timer is working
- `isWorkOn` - boolean var for checking if Work Timer is on (set to true, because the App starts with the Work Timer)
- `activePauseButton` - boolean var for checking if the user can press the Pause button


```javascript
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state =  {
      time: 0,
      start: 0,
      color: '#000000',
      valueWorkTimer: 0,
      valueRestTimer: 0,
      isOn: false,
      isWorkOn: true,
      activePauseButton: false,
    }
  }
```

### TimePickerHandlers

Then I define two functions `WorkTimerCallback` and `RestTimerCallback` which receive a value from a [TimePicker](./TimerPicker.js) component (minutes) and assign it to the proper `state` variable converted into seconds. I also concole log the values for error checking.

```javascript
  WorkTimerCallback = (dataFromTimerPicker) => {
      this.setState(prevState => ({
        valueWorkTimer: dataFromTimerPicker * 60,
      }))
      console.log(`Work: ${this.state.valueWorkTimer}`)
  }

  RestTimerCallback = (dataFromTimerPicker) => {
    this.setState(prevState => ({
      valueRestTimer: dataFromTimerPicker * 60,
    }))
    console.log(`Rest: ${this.state.valueRestTimer}`)
  }
```

### startTimer

In the `startTimer` function, which is executed when the user presses on the Play button, I first determine `color` for the Timer display text. If the Work timer is on (`isWorkOn === true`, the text gets reddish color `colorWork`, alternatively, the text gets purple color `colorRest`.  

Then I assign the right current `time`. If the App is off (timers are not working, i.e. `isOn === true`), then the `time` needs to get either the initial Work timer value `valueWorkTimer` or Rest timer value `valueRestTimer`. This choice is made using `isWorkOn` variable. In case App is on `time` variable does not change. 

I also assign **true** to the `isOn` variable beacause `startTimer` function makes the whole App work.

By the way, the Pause button gets activated `activePauseButton: true` and the Play button becomes inactive, which is quite logical, as you only want to use Pause button, when the App is in a work mode. 

`this.interval = setInterval(this.decreaseTimer, 1000)` executes a function `decreaseTimer` every second and returns an `intervalID`. I will discuss this function a bit later. 

I also console log, that the timer has started working.

```javascript
startTimer = () => {
    this.setState(prevState => ({
      color: (prevState.isWorkOn) ? colorWork : colorRest,
      time: (!prevState.isOn) ? ((prevState.isWorkOn) ? prevState.valueWorkTimer : prevState.valueRestTimer) : prevState.time,
      isOn: true,
      activePauseButton: true,
    }))
    this.interval = setInterval(this.decreaseTimer, 1000)
    console.log('START')
  }
```

### stopTimer

In `stopTimer()` function, which I use in the `decreaseTimer` function, I clear the interval (`clearInterval()` has the access to the same pool of IDs as the `setInterval()`)

I also change the `state` variable `isOn` to false and console log, that the timer has stoped working. 

```javascript
stopTimer = () => {
    clearInterval(this.interval)
    this.setState(prevState => ({
      isOn: false,
    }))
    console.log('STOP')
  }
```

### pauseTimer

`pauseTimer()`, which is executed when th user presses the Pause button, looks exactly like the `stopTimer()` except for the fact that I change only `activePauseButton` state variable to state. It is logical as the user only wants the Play button to be active, when the timer is paused.  

I also console log "STOP" message for error checking.

```javascript
 pauseTimer = () => {
    clearInterval(this.interval)
    console.log('STOP')
    this.setState(prevState => ({
      activePauseButton: false,
    }))
  }
```
### resetTimer 

`resetTimer()` is executed when the user presses on the RESET button. It clears the interval and sets the state to its initial values.  

I also console log "RESTART" message for error checking.

```javascript
resetTimer = () => {
    clearInterval(this.interval)
    this.setState(prevState => ({
      time: 0,
      color: '#000000',
      isOn: false,
      isWorkOn: true,
      activePauseButton: false,
    }))
    console.log('RESTART')
  }
```

### decreaseTimer

I'll now discuss the `decreaseTimer()` function that every second while the timer is working. 

Firstly, it checks if the current time is 0 or less, meaning that it should stop. If it so, the function executes `stopTimer()` and makes a the iPhone vibrate for a second. It also changes the `isWorkOn` to the opposite value, so that the App could switch between Work and Rest timers. After doing that, `decreaseTimer()` starts the timer. 

If the `time` is not 0 or less than that, `time` value decreases by 1 second and console logs "Working" message.

```javascript
decreaseTimer = () => {
    if (this.state.time <= 0) {
      this.stopTimer()
      Vibration.vibrate(1000)
      this.setState(prevState => ({
        isWorkOn: !prevState.isWorkOn
      }))
      console.log(this.state.isWorkOn)
      this.startTimer()
    } else {
      console.log('Working')
      this.setState(prevState => ({
        time: prevState.time - 1,
      }))
    }
  }
```
### displayTimer

This function is used to render a pretty Timer display text with minutes and seconds and all the trailing zeros. 

```javascript
displayTimer = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    return minutes + ':'  + (seconds < 10 ? '0' : '') + seconds
  }
```

### render

In this function I render all the components I want on my screen with styles. 

Pause/Play buttons are implemented as `TouchableOpacity` components, where their `style` attribute is defined based on `activePauseButton` value.

```javascript
render() {
    return (
      <View style={styles.appContainer}>
        <Image style={styles.imgActive} source={require('./img/tomato.png')}></Image>
        <Text style={{fontSize: 50, alignSelf: 'center', color: this.state.color}}>{this.displayTimer(this.state.time)}</Text>
        <Button onPress={this.resetTimer} title='RESET'/>
        <View style={styles.timerSetContainer}>
          <TimePicker color={colorWork} heading={'Work'} callback={this.WorkTimerCallback}/>
          <TimePicker color={colorRest} heading={'Rest'} callback={this.RestTimerCallback}/>
        </View>
        <View style={styles.timerSetContainer}>
        <TouchableOpacity onPress={this.pauseTimer} disabled={!this.state.activePauseButton} style={styles.touchButton}>
          <Image style={this.state.activePauseButton ? styles.imgActive : styles.imgInactive} source={require('./img/pause-button.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.startTimer} disabled={this.state.activePauseButton} style={styles.touchButton}>
          <Image style={!this.state.activePauseButton ? styles.imgActive : styles.imgInactive} source={require('./img/play-button.png')}></Image>
        </TouchableOpacity>
        </View>

      </View>
    )
  }
```

## TimePicker

Firstly, I'll look back at the `render` function in [App.js](./App.js).

### Propss

```javascript
<TimePicker color={colorWork} heading={'Work'} callback={this.WorkTimerCallback}/>
<TimePicker color={colorRest} heading={'Rest'} callback={this.RestTimerCallback}/>
```
`TimePicker` component receives three props:

- `color` - for headings
- `heading` - title of the `TimePicker` ("Work" or "Rest")
- `callback` - a function that receives a value that `TimePicker` outputs and assigns it either to `valueWorkTimer` or `valueRestTimer`.

Now I'll discuss the component itself. 

### Imports

I import all common and standard components with the addition of a `NumericInput`, beacause the user only needs to provide a number of minutes for Work/Rest timers.

```javascript
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import NumericInput from 'react-native-numeric-input'
```

### Styles

Here I define just two simple styles.

```javascript
const styles = StyleSheet.create({
    appContainer: {
        alignItems: 'center',
    },
    head: {
        fontSize: 50,
    },
})
```

### State

In state I only save the number of minutes the user has choosen via the `NumericInput`.

```javascript
export default class TimePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            minutes: 0
        }
    }
```





## Credits 

<div>Icon of a cute Tomato and Pause Button was made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>

<div>Icon of an Alarm Clock, Play Button was made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>