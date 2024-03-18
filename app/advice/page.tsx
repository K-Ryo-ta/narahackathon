import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';

const images = [
  "/images/coupon.svg",
  "/images/recipe.svg",
  "/images/coupon2.svg",
  "/images/advice.svg"
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const Page = () => {
  const randomImage = getRandomImage();

  return (
    <div className='mx-auto max-w-[340px] mx-auto rounded-2xl w-[90vw] bg-gray-100 mt-5' >
      <br />
      <img src={randomImage} alt="Random Image" className='mx-auto' style={{ width: '280px', border: '2px solid black', marginTop: '30px' }} />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Page;
