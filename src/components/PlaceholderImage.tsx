import React from 'react';
import placeholder from 'assets/img/logo.png';

const PlaceholderImage: React.FC = () => {
  return (
    <img
      src={placeholder}
      alt="Placeholder"
    />
  );
};

export default PlaceholderImage;
