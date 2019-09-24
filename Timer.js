import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    timerPosition: {
        alignItems: 'center',
    },
    text: {
        fontSize: 50,

    },
    touchButton: {
        alignSelf: 'center',
        marginTop: "10%",
        marginRight: 150, 
        marginLeft: 150, 
     },
})

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initValue: 0,
            time: 0,
        }
    }

    componentDidMount() {
        this.setState(prevState => ({
            initValue: this.props.TimerValue,
            time: this.props.TimerValue,
        }))
        this.interval = setInterval(this.decreaseCount, 1000)
    }

    componentWillUnmount () {
        if (!this.props.activated){
            clearInterval(this.interval)    
        }
    }

    decreaseCount = () => {
        console.log(`WORKING!!!`)
        this.setState(prevState => ({
            time: prevState.time - 1,
        }))
    }
    
    render() {
        if(this.props.activated){
            return(
                <View style={styles.timerPosition}>
                    <Text style={[styles.text, {color: this.props.color}]}>{this.state.time}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.timerPosition}>
                    <Text style={[styles.text, {color: this.props.color}]}>{this.state.initValue}</Text>
                </View>
            )
        }
    } 
}
