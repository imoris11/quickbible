import React, { Component } from 'react'
import { View, Text } from 'native-base'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'


export class Bookmarks extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello Bookmarks</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default connect(null, null)(Bookmarks)