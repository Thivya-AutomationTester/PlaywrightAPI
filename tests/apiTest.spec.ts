import { test, APIRequestContext, request, APIResponse } from '@playwright/test';
const authPayload = { "username": "admin", "password": "password123" }
const bookingPayload = JSON.parse(JSON.stringify(require("../utils/CreateBooking_TestData.json")))
let token: string | number, bookingid: number;
let apiContext: APIRequestContext;
test('Authentication', async () => {

  apiContext = await request.newContext();
  const authResponse: APIResponse = await apiContext.post("/auth"
    , { data: authPayload });
  const authReponseJson: any = await authResponse.json();
  token = authReponseJson.token;
  console.log("Token: ", token);

});
test('Create Booking', async () => {

  apiContext = await request.newContext();
  const bookingResponse = await apiContext.post("/booking"
    , { data: bookingPayload[0] });
  const bookingReponseJson = await bookingResponse.json();
  bookingid = bookingReponseJson.bookingid;
  console.log("Booking Id: ", bookingid);

});
test('Get Booking Info', async () => {

  apiContext = await request.newContext();
  const bookingResponse = await apiContext.get(`/booking/${bookingid}`);
  const bookingReponseJson = await bookingResponse.json();
  console.log("Get Booking response: ", bookingReponseJson);

});
test('Get All Booking Ids and check if created booking id is present', async () => {

  apiContext = await request.newContext();
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
test('Update Booking Info', async () => {

  apiContext = await request.newContext();
  const updateBookingResponse = await apiContext.put(`/booking/${bookingid}`, {
    data: bookingPayload[1], headers: {
      'Cookie': `token=${token}`,
      'Content-Type': 'application/json'
    }
  });
  const UpdatedReponseJson = await updateBookingResponse.json();
  console.log(UpdatedReponseJson);

});
test('Partial update Booking Info', async () => {

  apiContext = await request.newContext();
  const partialUpdateResponse = await apiContext.patch(`/booking/${bookingid}`, {
    data: bookingPayload[2], headers: {
      'Cookie': `token=${token}`,
      'Content-Type': 'application/json'
    }
  });
  const UpdatedReponseJson = await partialUpdateResponse.json();
  console.log("Partial Update response: ", UpdatedReponseJson);

});
test('Delete Booking Info', async () => {

  apiContext = await request.newContext();
  const deleteResponse = await apiContext.delete(`/booking/${bookingid}`, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`
    }
  });
  const deletedReponse = await deleteResponse.text();
  console.log("deletedReponse: ", deletedReponse);

});
