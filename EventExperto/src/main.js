// https://www.eventbriteapi.com/v3/users/me/?token=SESXYS4X3FJ5LHZRWGKQ


import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';

const API_KEY = 'Bearer SZRBEN2CGEUPT57YVMXP';
const ROOT_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});

module.exports = React.createClass({

  getInitialState() {
    return ({
      dataSource: ds.cloneWithRows([
        {
          name: {
            text: 'Event 1'
          },
          url: 'www.eventone.com'
        }
      ]),
      eventType: '',
      city: ''
    })
  },

  componentDidMount(){
    this.searchEvents('hackathon Austin');
  },

  searchEvents(category){
    const FETCH_URL = `${ROOT_URL}?q=${category}/`;

    fetch(FETCH_URL, {
      method: 'GET',
      headers: {
        'Authorization': API_KEY
      }
    })
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log('responseJSON: ', responseJSON);
      this.setState({dataSource: ds.cloneWithRows(responseJSON.events)});
    });
  },

  renderRow(rowData){
    const defaultImg = 'https://cdn.pixabay.com/photo/2014/08/21/19/43/question-423604__340.png';
    let img = rowData.logo != null ? rowData.logo.url : defaultImg;

    return (
      <View style={styles.row}>
        <Image
          style={styles.rowLogo}
          source={{uri: img}}
        />
        <View style={styles.rowDetails}>
          <Text>
            {rowData.name.text.length > 30 ?
            `${rowData.name.text.substring(0,30)}...`:
            rowData.name.text
            }
          </Text>
          <Text>
            more details
          </Text>
        </View>
      </View>
    )
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Event Expert
        </Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Event type and City..."
            onChangeText={(text)=> this.setState({eventType: text})}
          />
          {/* <TextInput
            style={styles.input}
            placeholder="city..."
            onChangeText={(text)=> this.setState({city: text})}

          /> */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.searchEvents(this.state.eventType)}
          >
            <Text style={styles.button}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
      </View>
    )
  }
})

const styles= StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flex: .1,
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20
  },
  form: {
    flex: .2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    flex:2
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 5
  },
  rowDetails: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowLogo: {
    flex: 1,
    width: 50,
    height: 50,
    borderColor: 'black',
    borderWidth: 1
  },
  input: {
    flex: 1,
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    textAlign: 'center'
  },
  buttonContainer: {
    flex: 1,
    padding: 5
  },
  button: {
    borderColor: '#0000FF',
    borderRadius: 5,
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    color: '#0000FF',
    width: 365,
    margin: 3
  }
})
