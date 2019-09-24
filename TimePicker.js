import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import NumericInput from 'react-native-numeric-input'

const styles = StyleSheet.create({
    appContainer: {
        alignItems: 'center',
    },
    head: {
        fontSize: 50,
    },
})

export default class TimePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            minutes: 0
        }
    }

    toParentFunction = (timePickerValue) => {
        this.state.minutes = timePickerValue
        this.props.callback(timePickerValue)
        //console.log(this.state.minutes)
    }

    render() {
        return(
            <View style={styles.appContainer}>
                <Text style={[styles.head, {color: this.props.color}]}>{this.props.heading}</Text>
                <NumericInput
                    value = {this.state.minutes}
                    minValue={0}
                    maxValue={60}
                    totalHeight={80}
                    rounded
                    type='up-down'
                    onChange={value => this.toParentFunction(value)}
                />
            </View>
        )
    }
}