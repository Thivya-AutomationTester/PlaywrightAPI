import { test } from '../fixtures/test-fixtures';
import { BookingHelpers } from '../utils/BookingHelpers';
import bookingPayload from '../utils/test-data.json';
const [addBooking, updateBooking, partialBooking] = bookingPayload;


test('01 - Get Booking Info', async ({ apiContext, bookingid, assertResponse }) => {

  const bookingResponse = await apiContext.get(`/booking/${bookingid}`);
  await assertResponse(bookingResponse);
  const responseGet = await bookingResponse.json();
  BookingHelpers.assertBookingDetails(responseGet, addBooking);

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
    data: updateBooking
  });
  await assertResponse(updateBookingResponse);
  const responseAfterUpdate = await updateBookingResponse.json();
  BookingHelpers.assertBookingDetails(responseAfterUpdate, updateBooking);
});

test('04 - Partial update Booking Info', async ({ apiContext, bookingid, assertResponse }) => {
  const partialUpdateResponse = await apiContext.patch(`/booking/${bookingid}`, {
    data: partialBooking
  });
  await assertResponse(partialUpdateResponse);
  const responseAfterPartialUpdate = await partialUpdateResponse.json();
  BookingHelpers.assertBookingDetails(responseAfterPartialUpdate, partialBooking);

});

test('05 - Delete Booking Info', async ({ apiContext, bookingid, assertResponse }) => {
  const deleteResponse = await apiContext.delete(`/booking/${bookingid}`);
  await assertResponse(deleteResponse, 'Created');
});
