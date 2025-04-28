import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import type { JSX, PropsWithChildren } from 'react'

type CurrencyButtonProps = PropsWithChildren<{
    name: string;
    flag: string;
}>

const CurrencyButton = (props: CurrencyButtonProps): JSX.Element => {
  return (
    <View style={styles.buttonConatiner}>
        <Text style={styles.flag}>{props.flag}</Text>
        <Text style={styles.country}>{props.name}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    buttonConatiner: {
        alignItems: 'center'
    },
    flag:{
        fontSize:28,
        color:'#FFFFFF',
        marginBottom: 4
    },
    country:{
        fontSize:14,
        color:'#2d3436',
    }
})


export default CurrencyButton