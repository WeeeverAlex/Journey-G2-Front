import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function ResponsiveDateTimePickers() {
  const [value, setValue] = React.useState(dayjs('2023-00-00T 00:00:00.000Z'));
  console.log(value)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DateTimePicker
          renderInput={(params) => <TextField {...params} />}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          disablePast
          label="Data e Hora"
          inputFormat="DD/MM/YYYY HH:mm"
          renderDay={(day) => {
            return (
              <div>
                {dayjs(day).format('DD')}
              </div>
            )
          }}
        />
      
    </LocalizationProvider>
  );
}