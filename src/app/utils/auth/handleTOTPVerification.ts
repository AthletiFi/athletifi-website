import { verifyTOTPSetup } from 'aws-amplify/auth';

export default async function handleTOTPVerification(totpCode: string) {
  try {
    await verifyTOTPSetup({ code: totpCode });
  } catch (error) {
    console.error(error);
  }
}
