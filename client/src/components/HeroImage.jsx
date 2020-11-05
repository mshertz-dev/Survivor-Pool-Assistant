import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Image = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(https://i.pinimg.com/originals/42/df/10/42df1015f53c10791c85844364c981bf.jpg);
  height: 400px;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  margin-bottom: 20px;
  padding-bottom: 10px;
`;

const Text = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 150%;
`;

function HeroImage(props) {
  return (
    <Image>
      <Text>
        <h1>NFL Survivor Assistant</h1>
        <p>Simplify your week.</p>
      </Text>
    </Image>
  )
}

export default HeroImage;