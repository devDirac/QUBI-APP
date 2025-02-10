import React from 'react'
import type { CarruselTextosProps } from './types'
import './style.scss'

import Carousel from 'react-material-ui-carousel';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';


const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: 'transparent',
    border:'none'
}));

const CarruselTextos: React.FC<CarruselTextosProps> = (props: CarruselTextosProps) => {


    return (
        <Carousel
            interval={3000}
            animation="slide"
            indicators={true}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                },
            }}
        >
            {props?.items.map((item, i) => (
                <StyledPaper key={i}>
                    <Typography variant="h4" gutterBottom>
                        {item.text}
                    </Typography>
                </StyledPaper>
            ))}
        </Carousel>
    )
}

export default CarruselTextos;
