import React, {useState} from 'react';
import {View, Button} from 'react-native';
import { Input } from 'galio-framework';
import themes from '../Screens/themes'

import DateTimePicker from '@react-native-community/datetimepicker';

export default DatetimePickerComponent = (props) => {
  const { dataDate } = props.dataDate;
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
        {/* Change to input and get value to placholder */}
        {/* <Input  placeholder="Show date picker!" /> */}
        <Input  value={date} rounded placeholder="Select Time"  onPress={showDatepicker}  color={themes.COLORS.PRIMARY} style={{flex:1,margin:15,maxHeight: 40,width:width/3, borderColor: themes.COLORS.PRIMARY }} placeholderTextColor={themes.COLORS.PRIMARY} />

      </View>
      <View>
        <Input onPress={showTimepicker} placeholder="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};