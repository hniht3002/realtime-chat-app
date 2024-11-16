import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const InputField = ({id, label, fullWidth = false, type="text", showPassword=false, onClick, name, error = false, errorMessage = ""}) => {
    
  return (
    <FormControl fullWidth = {fullWidth} error = {error}>
        <InputLabel htmlFor={id} sx={{'&.Mui-focused': {color: 'black'}}}>{label}</InputLabel>
        <Input  name = {name} type={type ==="text" || type === "password" && showPassword == true ? "text" : "password"} id={id} aria-describedby="my-helper-text" required
                sx={{fontSize: '1rem', fontWeight: '600', px: '12px', "&.MuiInput-underline:after":{borderBottomColor: 'black'}}}
                endAdornment={ type === 'password' && (
                    <InputAdornment position="end">
                        <IconButton onClick={onClick}>
                          {!showPassword && <VisibilityOffIcon />}
                          {showPassword && <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                )}
        />
        {errorMessage.length > 0 && <FormHelperText id="error">{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default InputField