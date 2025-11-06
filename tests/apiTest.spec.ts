import { test } from '../fixtures/authentication';
import { APIRequestContext, request, APIResponse } from '@playwright/test';
const bookingPayload = JSON.parse(JSON.stringify(require("../utils/TestData.json")))
let bookingid: number;
let apiContext: APIRequestContext;

test('Create Booking', async ({ apiContext }) => {

  const bookingResponse: APIResponse = await apiContext.post("/booking"
    , { data: bookingPayload[0] });
  const bookingReponseJson = await bookingResponse.json();
  bookingid = bookingReponseJson.bookingid;
  console.log("Booking Id: ", bookingid);

});
test('Get Booking Info', async ({ apiContext }) => {

  const bookingResponse = await apiContext.get(`/booking/${bookingid}`);
  const bookingReponseJson = await bookingResponse.json();
  console.log("Get Booking response: ", bookingReponseJson);

});
test('Get All Booking Ids and check if created booking id is present', async ({ apiContext }) => {

  const allBookingResponse = await apiContext.get("/booking");
  const allBookingReponseJson = await allBookingResponse.json();
  console.log("Get All Booking ids: ", allBookingReponseJson);
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
test('Update Booking Info', async ({ apiContext }) => {


  const updateBookingResponse = await apiContext.put(`/booking/${bookingid}`, {
    data: bookingPayload[1]
  });
  const UpdatedReponseJson = await updateBookingResponse.json();
  console.log(UpdatedReponseJson);

});
test('Partial update Booking Info', async ({ apiContext }) => {
  const partialUpdateResponse = await apiContext.patch(`/booking/${bookingid}`, {
    data: bookingPayload[2]
  });
  const UpdatedReponseJson = await partialUpdateResponse.json();
  console.log("Partial Update response: ", UpdatedReponseJson);

});
test('Delete Booking Info', async ({ apiContext }) => {
  const deleteResponse = await apiContext.delete(`/booking/${bookingid}`);
  const deletedReponse = await deleteResponse.text();
  console.log("deletedResponse: ", deletedReponse);

});
