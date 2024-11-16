import React, { useRef, useState } from 'react'
import { Box, FormControl, Typography, Button, FormControlLabel, Checkbox } from '@mui/material'
import InputField from '../../components/FormComponent/InputField';
import RadioSelectField from '../../components/FormComponent/RadioSelectField';
const SignUp = () => {
  const genderOptions = [
    {
      label: "Male",
      value: "male",
    }, 
    {
      label: "Female",
      value: "female"
    }
  ]

  const formRef = useRef()
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current);
    for (let [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`);
    }
    console.log('submitted')
  }

  console.log("render")

  let bgImage = "https://cdn.pixabay.com/photo/2023/12/22/20/57/ai-generated-8464364_1280.jpg"
  return (
    <Box className="flex items-center justify-center flex-col bg-no-repeat bg-cover rounded-2xl flex-1" sx={{ backgroundImage: `url(${bgImage})`, maxWidth: '800px', minHeight: '500px', padding: "50px 0"}}>
          <Box className = "bg-white p-4 rounded-lg w-8/12">
            <Typography variant='subtitle1' sx={{fontWeight: "bold", marginBottom: "16px"}}>Sign up into your account</Typography>

            <form ref={formRef} className='py-5' onSubmit={handleSubmit}>
              <div className='flex items-center justify-center flex-col gap-4'>
                <InputField name="fullName" fullWidth={true} label="Full Name" id="fullName" type="text"/>
                <InputField name="username" fullWidth={true} label="User name" id="username" type="text"/>
                <InputField name="email" fullWidth={true} label="Email" id="email" type="text"/>
                <InputField name="password" fullWidth={true} label="Password" id="Password" type="password" showPassword={showPassword} onClick={() => {setShowPassword(!showPassword)}}/>
                <InputField name="confirmPassword" fullWidth={true} label="Comfirm Password" id="ComfirmPassword" type="password" showPassword={showComfirmPassword} onClick={() => {setShowComfirmPassword(!showComfirmPassword)}}/>
                <RadioSelectField fullWidth = {true} label={"Gender"} options = {genderOptions} name={"gender"}/>
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
              >Sign Up</Button>
              
            </form>

          </Box>
        </Box>
  )
}


export default SignUp;