import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import Weather from "./Weather";

export default class App extends React.Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
    position => {
      this.getWeather(position.coords.latitude, position.coords.longitude);
    },
    error => {
      this.setState({
        error:error
      })
    });
  }
  getWeather = (lat, lon) => {
    fetch(
      'https://devcho.herokuapp.com/weather?lat='+lat+'&lon='+lon
    )
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature:json.main.temp,
        name:json.weather[0].main,
        isLoaded:true,
      })
    })
  }

  render() {
    const {isLoaded, error, temperature, name} = this.state;
    return (
      <View style={styles.container}>
        {isLoaded ? (
          <Weather weatherName={name} temp={Math.floor(temperature - 273.15)}/>
        ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the weather..</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText: {
    color:"red",
    marginBottom: 40
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: "center",
    alignItems:"center"
  },
  loadingText:{
    color:"red",
    fontSize: 30,
  }
});
