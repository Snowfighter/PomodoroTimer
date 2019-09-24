import React from 'react'
import {View, Text, Button, StyleSheet, Image, TouchableOpacity, Vibration} from 'react-native'
import Constants from 'expo-constants'
import TimePicker from './TimePicker.js'

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

const colorWork = '#ED4C67'
const colorRest = '#D980FA'

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

  stopTimer = () => {
    clearInterval(this.interval)
    this.setState(prevState => ({
      isOn: false,
    }))
    console.log('STOP')
  }

 pauseTimer = () => {
    clearInterval(this.interval)
    console.log('STOP')
    this.setState(prevState => ({
      activePauseButton: false,
    }))
  }

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

  displayTimer = (time) => {
    let minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    return minutes + ':'  + (seconds < 10 ? '0' : '') + seconds
  }

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
} 