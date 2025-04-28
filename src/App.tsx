import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

//Constants
import { currencyByRupee } from './constants';
//Components
import CurrencyButton from './components/CurrencyButton';

import Snackbar from 'react-native-snackbar';

export default function App() {

  const [inputValue, setInputvalue] = useState('')
  const [resultValue, setResultvalue] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')

  const buttonPressed = (targetValue:Currency)=>{
    if(!inputValue){
      return Snackbar.show({
        text: "Enter a value to convert",
        backgroundColor:'#EA7773',
        textColor:'#000000',
      })
    }

    const inputAmount = parseFloat(inputValue)
    if(!isNaN(inputAmount)){
      const convertedValue = inputAmount * targetValue.value
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`
      setResultvalue(result)
      setTargetCurrency(targetValue.name)
    }else {
      return Snackbar.show({
        text: "Not a valid number to convert",
        backgroundColor:'#F4BE2C',
        textColor:'#000000',
      })
    }
  }

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
            maxLength={14}
            value={inputValue}
            clearButtonMode='always' // only for iOS
            onChangeText={setInputvalue}
            keyboardType='number-pad'
            placeholder='Enter amount in Rupees'
            style={styles.inputAmountField}
            />
          </View>
          {resultValue && (
            <Text style={styles.resultTxt}>
              {resultValue}
            </Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList 
          numColumns={3}
          data={currencyByRupee}
          keyExtractor={item => item.name}
          renderItem={({item})=>(
            <Pressable
            style={[
              styles.button,
              targetCurrency === item.name && styles.selected
            ]}
            onPress={()=>buttonPressed(item)}
            >
              <CurrencyButton {...item}/>
            </Pressable>
          )}
          />
        </View>
        <View style={styles.resetContainer}>
          <Pressable
          onPress={()=>(setInputvalue(''),setResultvalue(''),setTargetCurrency(''))}
          >
            <View style={styles.resetStyle}>
            <Text style={styles.resetTxt}>Reset</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f7fc',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 12,
    height: 85,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
  resetContainer:{
    alignItems:'center'
  },
  resetStyle:{
    height:50,
    width:95,
    backgroundColor:'#ffeaa7',
    margin:20,
    borderRadius:15
  },
  resetTxt:{
    fontSize:20,
    color:'#000000',
    paddingHorizontal:20,
    paddingVertical:10
  }
});