export interface Meeting {

  id: string;

  title: string;

  host: string;

  date: string;

  time: string;

  participants: number;

  status:
    | "live"
    | "upcoming"
    | "completed";

}