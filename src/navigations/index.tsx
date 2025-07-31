import { NavigationContainer } from '@react-navigation/native';
import UnauthorizedNavigations from './UnaunthorizedNavigations/unauth-nav.tsx';
import React from 'react';

const RootNavigations = () => {
  return (
    <NavigationContainer>
      <UnauthorizedNavigations />
    </NavigationContainer>
  );
};

export default RootNavigations;
