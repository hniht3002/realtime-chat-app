import { Box, Card, CardMedia, Typography } from '@mui/material';
import React from 'react'

const CardImageWithText = ({image, children, overlay = false, borderRadius = 0}) => {
    return (
        <Card sx={{ position: 'relative', width: '100%', height: '300px', borderRadius: `${borderRadius}px` }} className='bg-transparent'>
          <CardMedia
            component="img"
            image={image}
            alt="Background Image"
            sx={{ width: '100%', height: '100%', borderRadius: `${borderRadius}px` }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              // backgroundColor: 'transparent',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: `${borderRadius}px`
            }}
          >
            {children}
          </Box>
        </Card>
      );
    }

export default CardImageWithText