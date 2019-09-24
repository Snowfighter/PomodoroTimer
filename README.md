<img src='./media/logo.png' alt='Pomodoro Timer Logo' title='Pomodoro Timer' height='200'/>

# PomodoroTimer

As my 1st project in [React Native](https://facebook.github.io/react-native/) for [CS50 Mobile](https://courses.edx.org/courses/course-v1:HarvardX+CS50M+Mobile/course/) I had to implement a Pomodoro Technique Timer. Basically, you set a *Work* and *Rest* timer to some number of minutes and then the app switches between them while you work on a task. There are [multiple ways](https://en.wikipedia.org/wiki/Pomodoro_Technique) how you can mix the timers and use not just two, but I have decided to implement the basic one. 

<p align="center">
    <img src='./media/screenshot.png' alt='Screenshot' height='700'/>
</p>

## Table of contents

-   [Idea](#idea)
-   [App.js](#app.js)
-   [TimePicker.js](#timePicker.js)
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

## App.js

I am using [Expo](https://github.com/expo/expo) 

## TimePicker.js


## Credits 

<div>Icon of a cute Tomato and Pause Button was made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>

<div>Icon of an Alarm Clock, Play Button was made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></div>