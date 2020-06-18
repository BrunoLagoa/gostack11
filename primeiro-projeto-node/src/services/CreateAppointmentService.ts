import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRpository from '../repositories/AppointmentsRpository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRpository: AppointmentsRpository;

  constructor(appointmentsRpository: AppointmentsRpository) {
    this.appointmentsRpository = appointmentsRpository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointementInSameDate = this.appointmentsRpository.findByDate(
      appointmentDate,
    );

    if (findAppointementInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRpository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
