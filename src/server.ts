import config from './config'
import app from './app'
import { Booking } from './booking/booking.service';
import e from 'express';

const port = config.PORT

const start = async () => {
  await Booking.autoUpdateBookings().catch(console.error);

  setInterval(() => {
    Booking.autoUpdateBookings().catch(console.error);
  }, 86400 * 1000);

  app.get('/', (res: e.Response) => {
    res.send('Welcome to the Booking Service API');
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

start();