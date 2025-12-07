import config from './config'
import app from './app'
import { Booking } from './modules/booking/booking.service';
import {Request,Response} from 'express';

const port = config.PORT

const start = async () => {
  await Booking.autoUpdateBookings().catch(console.error);

  setInterval(() => {
    Booking.autoUpdateBookings().catch(console.error);
  }, 86400 * 1000);

  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Booking Service API');
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

start();