import { useEffect } from "react";
import { AwsRum } from 'aws-rum-web';

const usePageTracking = () => {
    useEffect(() => {
        if (!window.location.href.includes("localhost")) {

            try {
                const config = {
                    sessionSampleRate: 1,
                    guestRoleArn: "arn:aws:iam::146272391967:role/RUM-Monitor-us-east-1-146272391967-9685632151761-Unauth",
                    identityPoolId: "us-east-1:f0af859f-0e5e-4a8e-a95e-66750c441325",
                    endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
                    telemetries: ["performance", "errors", "http"],
                    allowCookies: true,
                    enableXRay: false
                };

                const APPLICATION_ID = '3279026c-3d66-4200-bb70-cc5e438fc791';
                const APPLICATION_VERSION = '1.0.0';
                const APPLICATION_REGION = 'us-east-1';

                new AwsRum(
                    APPLICATION_ID,
                    APPLICATION_VERSION,
                    APPLICATION_REGION,
                    config
                );

            } catch (error) {
                console.log(error);
            }
        }
    }, []);
};

export default usePageTracking;