import { setUpTOTP } from 'aws-amplify/auth';
import QRCode from 'qrcode';

export default async function handleTOTPSetup(): Promise<{
  src: string;
  key: string;
}> {
  try {
    const totpSetupDetails = await setUpTOTP();
    const appName = 'athletifi-website';
    const setupUri = totpSetupDetails.getSetupUri(appName);
    const res = await QRCode.toDataURL(setupUri.toString());
    return {
      src: res,
      key: totpSetupDetails.sharedSecret,
    };
  } catch (error) {
    console.error(error);
    return { src: '', key: '' };
  }
}
