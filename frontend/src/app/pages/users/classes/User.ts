import {UserBadge} from "./UserBadge";

export interface User {
  id: number;
  name: string;
  image: string;
  createdAt: number;
  badges: UserBadge[];
}
