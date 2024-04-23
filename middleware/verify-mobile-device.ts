import { Middleware } from '@nuxt/types';

const verifyMobileDevice: Middleware = ({ $device, redirect }) => {
  if (!$device.isMobileOrTablet) redirect('/');
};

export default verifyMobileDevice;
