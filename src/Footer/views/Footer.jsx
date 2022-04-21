import React from 'react';
import useStyles from './styles/Footer.style';
import { Container, Typography } from '@mui/material';

const Footer = () => {
  const { footer } = useStyles();

  return (
    <Container className={footer}>
			<Typography variant='caption'>
			  2022 Liverpool / Todos los derechos reservados D.R. ®
			</Typography>
		</Container>
  )
}

export default Footer
