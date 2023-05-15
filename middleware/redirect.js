import { REDIRECT_LIST } from '~/constants/redirects';

export default function ({ route, redirect }) {
  const { slug } = route.params;
  const redirectIndex = REDIRECT_LIST.findIndex((r) => r.param === slug);

  if (redirectIndex === -1) {
    return;
  }

  const { toPath, param } = REDIRECT_LIST[redirectIndex];

  redirect(`/${toPath}/${param}`);
}
