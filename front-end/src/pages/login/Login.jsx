import React, { useRef, useState } from 'react'
import { Box, FormControl, Typography, Button, FormControlLabel, Checkbox, Stack } from '@mui/material'
import InputField from '../../components/FormComponent/InputField';
import ErrorIcon from '@mui/icons-material/Error';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({state:false, message: ""})
  const [usernameError, setUsernameError] = useState({state: false, message: ""});
  const [passwordError, setPasswordError] = useState({state: false, message: ""});
  const formRef = useRef()

  const handleError = (data) => {
    if(!data.errors) {
      return false;
    }
    data.errors.forEach((err, index) => {
      if(err.path == "username"){
        setUsernameError({state: true, message: err.msg});
        return;
      }
  
      if(err.path == "password"){
        setPasswordError({state: true, message: err.msg});
        return;
      }

      setError({state:true, message: err.msg});
      setUsernameError({state: true, message: ""})
      setPasswordError({state: true, message: ""})
      return;
    })  
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setUsernameError({state:false, message: ""})
    setPasswordError({state:false, message: ""})
    setError({state:false, message: ""})

    const formData = new FormData(formRef.current);
    const formDataObject = Object.fromEntries(formData.entries());   

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(formDataObject)
      })
  
      const data = await res.json()

      const hasError = handleError(data)

      if(!hasError) {
        console.log("Login success");
      }
      

    } catch(err) {
      handleError(err)
    }
    
  }

  let bgImage = "https://cdn.pixabay.com/photo/2023/12/22/20/57/ai-generated-8464364_1280.jpg"
  return (
    <Box className="flex items-center justify-center flex-col bg-no-repeat bg-cover rounded-2xl flex-1" sx={{ backgroundImage: `url(${bgImage})`, maxWidth: '800px', height: '500px'}}>
          <Box className = "bg-white p-4 rounded-lg w-8/12">
            <Typography variant='subtitle1' sx={{fontWeight: "bold", marginBottom: "16px"}}>Login into your account</Typography>
            {error.state && 
            <Stack direction="row" alignItems="center" flex={1} spacing={1} sx={{ marginBottom: "16px" }}>
              <ErrorIcon color="error" />
              <Typography variant="body2" color="error" sx={{ fontSize: '14px' }}>
                {error.message}
              </Typography>
            </Stack>
            }
            <form ref={formRef} className='py-5' onSubmit={handleSubmit}>
              <div className='flex items-center justify-center flex-col gap-4'>

                <InputField name={'username'} fullWidth={true} label="Username" id="username" type="text" error={usernameError.state} errorMessage={usernameError.message}/>
                <InputField name={'password'} fullWidth={true} label="Password" id="password" type="password" error={passwordError.state} errorMessage={passwordError.message} showPassword={showPassword} onClick={() => {setShowPassword(!showPassword)}}/>

              </div>

              <div className='flex items-center justify-between mt-2 flex-wrap'>
                <FormControl>
                  <FormControlLabel control={<Checkbox sx={{paddingRight: 0}}/>} label="Remember me"/>
                </FormControl>

                <a href="#" className='hover:underline hover:text-blue-500' style={{fontSize: '0.9rem'}}>Forgot your password?</a>
              </div>

              <Button variant="contained" 
                      type='submit'
                      sx={{
                        marginTop: '16px',backgroundColor: 'black', 
                        width: '100%', 
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: "white",
                          color: 'black',
                          outline: '1px solid black!important',
                        }             
                      }}              
              >Login</Button>
              
            </form>

          </Box>
        </Box>
  )
}


export default Login;