import React, { useRef, useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function DatePicker ({onChangeFunc}) {
  const datePickerRef = useRef(null);

  useEffect(() => {
    flatpickr(datePickerRef.current, {
      onChange: (selectedDates, dateStr, instance) => {
        if (onChangeFunc) {
          onChangeFunc(dateStr);
        }
      }
    });
  }, [onChangeFunc]);

  return (
      <input type="text" id="date" ref={datePickerRef} placeholder='Select a Date' onChange={(e) => {props.onChangeFunc}}/>
  )
}   