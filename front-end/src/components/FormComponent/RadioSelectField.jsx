import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material'
import React from 'react'

const SelectField = ({label, fullWidth, options, name}) => {
  return (
    <FormControl fullWidth={true}>
      <Stack direction={'row'} alignItems="center" spacing={2}> 
        <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name={name}
        >
          {options.map((option, index) => 
            (
              <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />
            )
          )}
        </RadioGroup>
      </Stack>
    </FormControl>
  );
}

export default SelectField