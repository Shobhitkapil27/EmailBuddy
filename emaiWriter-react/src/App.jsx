import { useState,useEffect } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { 
  Box, 
  CircularProgress, 
  Container, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select,         
  TextField, 
  Typography 
} from '@mui/material';
import { Button } from '@mui/material';



function App() {
  const[emailContent, setEmailContent]= useState('');
  const[tone, settone]= useState('');
  const[generatedReply, setGeneratedReply]= useState('');
  const[loading, setLoading]= useState(false);
  const [error, setError] = useState('');
  const [displayedText, setDisplayedText] = useState('');

  //This is where the post request is sent to the server.
  //If the response recieved is not OK we display the error message.
  const handleSubmit=async()=>{
        setLoading(true);
        setError('')
        try{
          const response= await axios.post("http://localhost:8080/api/email/generate",
            {emailContent,
              tone
            }
          );
          setGeneratedReply(typeof response.data==='string' ? response.data: JSON.stringify(response.data))
        }
        catch(error){
         setError("Failed to Generate Email Reply!!");
         console.error(error);
        }finally{
          setLoading(false);
        }
  };

//This helps in creating the type writer animation we see while printing the response.
useEffect(() => {
  if (!generatedReply) return;

  let index = 0;
  setDisplayedText(''); 

  const interval = setInterval(() => {
    setDisplayedText(prev => {
      const next = generatedReply.slice(0, index + 1);
      index++;
      if (index >= generatedReply.length) {
        clearInterval(interval);
      }
      return next;
    });
  }, 25); // Adjust speed here

  return () => clearInterval(interval);
}, [generatedReply]);

  return (
    <>
    <Box
  sx={{
    backgroundColor: '#807F7F',
    minHeight: '100vh',
    width: '100vw',
  }}
>
    <Container maxWidth={false}style={{ background: '#858277' }} sx={{py:4}}>
    <Typography
  variant='h3'
  component="h3"
  gutterBottom
  sx={{
    color: 'white',
    fontFamily: '"Cal Sans", sans-serif'
  }}
>
  Welcome to your Email Buddy!!
</Typography>

      <TextField
  multiline
  rows={8}
  id="text-search"
  label="Paste your E-mail here!"
  variant="filled"
  value={emailContent}
  onChange={(e) => setEmailContent(e.target.value)}

//This functions stops data to paste in original font
//If we not use this and simply paste data and change font of textfield it changes the font to
//original font when we click outside text field.
  onPaste={(e) => {
    e.preventDefault(); 
    const text = e.clipboardData.getData('text/plain'); 
    const cursorPos = e.target.selectionStart;
    const newValue = 
      emailContent.slice(0, cursorPos) +
      text +
      emailContent.slice(cursorPos);
    setEmailContent(newValue);
  }}
  inputProps={{
    style: {
      fontFamily: 'Tuffy',
    }
  }}


  sx={{
    fontFamily: 'Tuffy',
    width: '100%',
    borderRadius: '12px', // Rounded corners
    backgroundColor: 'white',
    '& .MuiFilledInput-root': {
      borderRadius: '12px', // Rounded corners for input field itself
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: 'white',
      },
      '&.Mui-focused': {
        backgroundColor: 'white',
        '& .MuiInputBase-root': {
          fontFamily: 'Tuffy',
          borderRadius: '12px',
        },
        '& input, & textarea': {
          fontFamily: 'Tuffy',
        },
      }
    }
  }}
/>

<FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 2 }}>
  <InputLabel>Tone(optional)</InputLabel>
  <Select
    value={tone || ''}
    label={"Tone(Optional)"}
   
    onChange={(e) => settone(e.target.value)}
    variant="filled"
    sx={{
      fontFamily: 'Tuffy',
      borderRadius: '12px', // Rounded edges for dropdown
      backgroundColor: 'white',
      '& .MuiFilledInput-root': {
        borderRadius: '12px',
      },
      '&:hover': {
        backgroundColor: 'white',
      },
      '&.Mui-focused': {
        backgroundColor: 'white',
        '& .MuiInputBase-root': {
          fontFamily: 'Tuffy',
          borderRadius: '12px',
        },
        '& input, & textarea': {
          fontFamily: 'Tuffy',
        },
      }
    }}
  >
    <MenuItem value="" sx={{ fontFamily: 'Tuffy, Arial, sans-serif' }}>None</MenuItem>
    <MenuItem value="Professional" sx={{ fontFamily: 'Tuffy, Arial, sans-serif' }}>Professional</MenuItem>
    <MenuItem value="Friendly" sx={{ fontFamily: 'Tuffy, Arial, sans-serif' }}>Friendly</MenuItem>
    <MenuItem value="Casual" sx={{ fontFamily: 'Tuffy, Arial, sans-serif' }}>Casual</MenuItem>
  </Select>
</FormControl>

<Button
  variant='contained'
  onClick={handleSubmit}
  disabled={!emailContent || loading}
  style={{ fontFamily: '"Cal Sans", sans-serif' }}
  fullWidth
  sx={{
    borderRadius: '12px', // Rounded corners
    backgroundColor: '#000000 !important',
    color: '#FFFFFF !important',
    '&:hover': {
      backgroundColor: '#FFFFFF !important',
      color: '#000000 !important', // Invert color for better contrast
    }
  }}
>
  {loading ? <CircularProgress size={24} /> : "Generate Reply"}
</Button>

{error &&<Typography color='error' sx={{mb:2}}>
   {error}
  </Typography>}

  {generatedReply &&(
    <Box sx={{mt:3}}>
     <Typography
  variant='h3'
  gutterBottom
  sx={{
    color: 'white',
    fontFamily: '"Cal Sans", sans-serif'
  }}
>
  Generated Reply :
</Typography>
      <TextField 
      fullWidth
      multiline
      minRows={3}  
      maxRows={20} 
      variant='outlined'
      value={displayedText||''}
      inputProps={{readOnly:true}}
      sx={{
        fontFamily: 'Tuffy',
        borderRadius: '12px',
        backgroundColor: 'white',
        '& .MuiInputBase-root': {
          fontFamily: 'Tuffy',
          borderRadius: '12px',
        },
        '& input, & textarea': {
          fontFamily: 'Tuffy',
        },
      }}/>
    </Box>
  )}
    </Container>
    </Box>
    </>
  )
 
}

export default App
