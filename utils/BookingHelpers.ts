import { expect } from '@playwright/test';

export class BookingHelpers {
    static assertBookingDetails(
        actualResponse: {
            firstname?: string;
            lastname?: string;
            totalprice?: number;
            depositpaid?: boolean;
            bookingdates?: { checkin?: string; checkout?: string };
            additionalneeds?: string;
        },
        expectedPayload: {
            firstname?: string;
            lastname?: string;
            totalprice?: number;
            depositpaid?: boolean;
            bookingdates?: { checkin?: string; checkout?: string };
            additionalneeds?: string;
        }
    ) {
        // Top-level fields
        if (expectedPayload.firstname !== undefined) {
            expect(actualResponse.firstname).toBe(expectedPayload.firstname);
        }
        if (expectedPayload.lastname !== undefined) {
            expect(actualResponse.lastname).toBe(expectedPayload.lastname);
        }
        if (expectedPayload.totalprice !== undefined) {
            expect(actualResponse.totalprice).toBe(expectedPayload.totalprice);
        }
        if (expectedPayload.depositpaid !== undefined) {
            expect(actualResponse.depositpaid).toBe(expectedPayload.depositpaid);
        }
        if (expectedPayload.additionalneeds !== undefined) {
            expect(actualResponse.additionalneeds).toBe(expectedPayload.additionalneeds);
        }

        // Nested bookingdates
        if (expectedPayload.bookingdates) {
            if (expectedPayload.bookingdates.checkin !== undefined) {
                expect(actualResponse.bookingdates?.checkin).toBe(expectedPayload.bookingdates.checkin);
            }
            if (expectedPayload.bookingdates.checkout !== undefined) {
                expect(actualResponse.bookingdates?.checkout).toBe(expectedPayload.bookingdates.checkout);
            }
        }
    }
}

