import config from './config'
import app from './app'
import { Booking } from './booking/booking.service';

const port = config.PORT

const start = async () => {
  await Booking.autoUpdateBookings().catch(console.error);

  setInterval(() => {
    Booking.autoUpdateBookings().catch(console.error);
  }, 86400 * 1000);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

start();