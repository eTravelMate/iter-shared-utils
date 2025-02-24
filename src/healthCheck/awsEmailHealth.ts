import { SESClient, GetSendQuotaCommand } from "@aws-sdk/client-ses";

export async function checkSESHealth(
  EMAIL_PROVIDER_BUCKET_REGION: any,
  EMAIL_PROVIDER_ACCESS_KEY_ID: any,
  EMAIL_PROVIDER_SECRET_ACCESS_KEY: any
) {  
  const sesClient = new SESClient({
    region: EMAIL_PROVIDER_BUCKET_REGION,
    credentials: {
      accessKeyId: EMAIL_PROVIDER_ACCESS_KEY_ID || "",
      secretAccessKey: EMAIL_PROVIDER_SECRET_ACCESS_KEY || "",
    },
  });

  try {
    const sesCommand = new GetSendQuotaCommand({});    
    const res = await sesClient.send(sesCommand);
    if (res) {
      return { status: "SUCCESS",
        message: "SES is healthy" };
    }
  } catch (error) {
    return {
      status: "Failure",
      env: `Region:${EMAIL_PROVIDER_BUCKET_REGION},ACCESS_KEY:${EMAIL_PROVIDER_ACCESS_KEY_ID}, SECRET_KEY:${EMAIL_PROVIDER_SECRET_ACCESS_KEY}`,
      message: `SES is unhealthy ,error:${error}`,
    };
  }
}
