import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'native-base'
import { connect } from 'react-redux'


export class Bible extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Hello Bible</Text>
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
export default connect(null, null)(Bible)