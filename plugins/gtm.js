export default function ({ $gtm, route }) {
  $gtm.init(process.env.GOOGLE_TAG_MANAGER_ID);
}
