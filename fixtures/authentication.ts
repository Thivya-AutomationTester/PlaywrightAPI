import { test as base, request, APIResponse, APIRequestContext } from '@playwright/test';
const authPayload = JSON.parse(JSON.stringify(require("../utils/TestData.json")))



export const test = base.extend<{ authToken: string | number, apiContext: APIRequestContext }>({

    authToken: async ({ request }, use) => {
        const authResponse: APIResponse = await request.post("/auth"
            , { data: authPayload[3] });
        const authReponseJson: any = await authResponse.json();
        const token = authReponseJson.token;
        // console.log("Token: ", token);
        await use(token);
    },
    apiContext: async ({ authToken }, use) => {

        const apiContext = await request.newContext({
            extraHTTPHeaders: {
                'Cookie': `token=${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        await use(apiContext);
        await apiContext.dispose();
    }

})