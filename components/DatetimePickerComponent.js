import React, {useState} from 'react';
import {View, Button, TouchableOpacity, StyleSheet ,Dimensions, Text} from 'react-native';
import { Input } from 'galio-framework';
import themes from '../Screens/themes'
const { width } = Dimensions.get('screen');
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default DatetimePickerComponent = (props) => {
  // const { valuepicker } = props;
  const a  = ''
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    props.valuepicker(date)
    hideDatePicker();
  };

  return (
    <View>
      <Button title="เลือกวัน-เวลา" style={{width:'100%'}} onPress={showDatePicker} />
      <DateTimePickerModal
        date={new Date()}
        isVisible={isDatePickerVisible}
        mode={'datetime'}
        is24Hour={true}
        timeZoneOffsetInSeconds={25200}
        timeZoneOffsetInMinutes={420} 
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
