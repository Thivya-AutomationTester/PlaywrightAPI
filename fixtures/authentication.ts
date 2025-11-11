import { test as base, expect, request, APIResponse, APIRequestContext } from '@playwright/test';
const Payload = JSON.parse(JSON.stringify(require("../utils/TestData.json")))

export const test = base.extend<{
    bookingid: number,
    authToken: string | number, apiContext: APIRequestContext, assertResponse: (response: any, expectedText?: string) => Promise<void>
}>({

    bookingid: async ({ request }, use) => {

        const bookingResponse = await request.post("/booking"
            , { data: Payload[0] });
        const bookingReponseJson = await bookingResponse.json();
        let id: number = bookingReponseJson.bookingid;
        await use(id);
    },
    authToken: async ({ request }, use) => {
        const authResponse: APIResponse = await request.post("/auth"
            , { data: Payload[3] });
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

    },

    assertResponse: async ({ }, use) => {
        await use(async (response, expectedText?: string) => {

            if (!response.ok()) throw new Error(`Response not OK: ${response.status()}`);
            if (expectedText !== undefined) {
                const text = await response.text();
                console.log("Response text: ", text);
                if (text !== expectedText)
                    throw new Error(`Expected "${expectedText}", got "${text}"`);
            }
            else {
                const json = await response.json();
                console.log("Response JSON: ", json);
            }
        });
    },

})