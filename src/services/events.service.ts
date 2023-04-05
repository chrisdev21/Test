import moment from 'moment';
import { EventsModel } from '../models';
import { Request } from 'express';

interface BodyPros {
  title: string;
  description: string;
  dateTime: Date;
}

const create = (userId: string, body: BodyPros) =>
  new Promise(async (rs, rj) => {
    try {
      const { title, description, dateTime } = body;
      const event = new EventsModel({
        owner_id: userId,
        title,
        description,
        dateTime,
      });
      await event.save();
      rs('Create event success!');
    } catch (err) {
      rj(err);
    }
  });

const list = (req: Request) =>
  new Promise(async (rs, rj) => {
    try {
      const { title, description, dateTime } = req.query;
      const query = {};
      if (dateTime) {
        const today = moment(dateTime as string).startOf('day');
        Object.assign(query, {
          dateTime: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate(),
          },
        });
      }

      if (title) {
        Object.assign(query, {
          title: { $regex: title, $options: 'i' },
        });
      }

      if (description) {
        Object.assign(query, {
          description: { $regex: description, $options: 'i' },
        });
      }

      const events = await EventsModel.find(query);
      rs(events);
    } catch (err) {
      rj(err);
    }
  });

const attendUser = (userId: string, eventId: string) =>
  new Promise(async (rs, rj) => {
    try {
      const event = await EventsModel.findById(eventId);
      if (!event) return rj('Event does not exist');

      const userIsExist = event.users.includes(userId);
      if (userIsExist) return rj('User already exist');
      await EventsModel.updateOne(
        {
          _id: eventId,
        },
        {
          users: [...event.users, userId],
        }
      );
      rs('Successfully attended');
    } catch (err) {
      rj(err);
    }
  });

const removeUser = (userId: string, eventId: string) =>
  new Promise(async (rs, rj) => {
    try {
      const event = await EventsModel.findById(eventId);
      if (!event) return rj('Event does not exist');
      const userIsExist = event.users.includes(userId);
      if (!userIsExist) return rj('User does not exist');

      const newUserList = [...event.users].filter((id) => id !== userId);
      await EventsModel.updateOne(
        {
          _id: eventId,
        },
        {
          users: newUserList,
        }
      );
      rs('Successfully removed');
    } catch (err) {
      rj(err);
    }
  });

const scheduleNew = (
  userId: string,
  body: {
    users: Array<string>;
    startDate: string;
    endDate: string;
    title: string;
    description: string;
  }
) =>
  new Promise(async (rs, rj) => {
    try {
      const { users, startDate, endDate, title, description } = body;
      let count = 0;
      for (let i = 0; i < users.length; i++) {
        const from = moment(startDate as string).startOf('day');
        const to = moment(endDate as string).startOf('day');

        const exist = await EventsModel.exists({
          users: users[i],
          dateTime: {
            $gte: from.toDate(),
            $lte: to.toDate(),
          },
        });

        if (!exist) {
          const newEvent = new EventsModel({
            owner_id: userId,
            title,
            description,
            users: [users[i]],
            dateTime: from.toDate(),
          });
          await newEvent.save();
          count++;
        }
      }
      rs({
        message: `New ${count} events are created smartly`,
      });
    } catch (err) {
      rj(err);
    }
  });

const EventService = {
  create,
  attendUser,
  removeUser,
  list,
  scheduleNew,
};

export default EventService;
