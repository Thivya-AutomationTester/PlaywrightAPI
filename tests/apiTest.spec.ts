import { test } from '../fixtures/authentication';
const bookingPayload = JSON.parse(JSON.stringify(require("../utils/TestData.json")))


test('01 - Get Booking Info', async ({ apiContext, bookingid, assertResponse }) => {

  const bookingResponse = await apiContext.get(`/booking/${bookingid}`);
  await assertResponse(bookingResponse);

});

test('02 - Get All Booking Ids and check if created booking id is present', async ({ apiContext, bookingid, assertResponse }) => {

  const allBookingResponse = await apiContext.get("/booking");
  const allBookingReponseJson = await allBookingResponse.json();

  await assertResponse(allBookingResponse);
  let flag: number = 0;
  for (const id of allBookingReponseJson) {
    if (id.bookingid === bookingid) {
      flag = 1;
      break;
    }
  }
  if (flag === 1) {
    console.log(`created booking id: ${bookingid} is present`)
  }
  else {
    console.log(`created booking id: ${bookingid} is not present`)
  }

});

test('03 - Update Booking Info', async ({ apiContext, bookingid, assertResponse }) => {
  const updateBookingResponse = await apiContext.put(`/booking/${bookingid}`, {
    data: bookingPayload[1]
  });
  await assertResponse(updateBookingResponse);
});

test('04 - Partial update Booking Info', async ({ apiContext, bookingid, assertResponse }) => {
  const partialUpdateResponse = await apiContext.patch(`/booking/${bookingid}`, {
    data: bookingPayload[2]
  });
  await assertResponse(partialUpdateResponse);
});

test('05 - Delete Booking Info', async ({ apiContext, bookingid, assertResponse }) => {
  const deleteResponse = await apiContext.delete(`/booking/${bookingid}`);
  await assertResponse(deleteResponse, 'Created');
});
