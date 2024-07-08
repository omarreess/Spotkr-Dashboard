import { Box, CircularProgress } from '@mui/material'

const CustomLoader = () => {
  return (
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          color: 'grey.500', // This style might not be valid, please adjust it as needed
          margin: '20% auto',
        }}
      >
        <CircularProgress color="success" />
      </Box>
  )
}

export default CustomLoader