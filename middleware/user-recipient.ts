import { Middleware } from '@nuxt/types';

const userRecipientMiddleware: Middleware = ({ app: { $accessor }, redirect }) => {
  if (!$accessor.user.getRecipient) {
    redirect('/');
  }
};

export default userRecipientMiddleware;
