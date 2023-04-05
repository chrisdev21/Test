import mongoose from 'mongoose';
import { TABLE_EVENT, TABLE_USER } from '../config/table';

interface IEvent {
  owner_id: mongoose.ObjectId;
  title: string;
  description: string;
  dateTime: Date;
  users: string[];
}

interface EventDoc extends mongoose.Document {
  owner_id: mongoose.ObjectId;
  title: string;
  description: string;
  dateTime: Date;
  users: string[];
}

interface EventModelInterface extends mongoose.Model<IEvent> {}

const newsPaperSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TABLE_USER,
      require: true,
    },
    title: String,
    description: String,
    dateTime: Date,
    users: [
      {
        type: String,
        ref: TABLE_USER,
      },
    ],
  },
  { timestamps: true }
);

export const EventsModel = mongoose.model<EventDoc, EventModelInterface>(
  TABLE_EVENT,
  newsPaperSchema
);
