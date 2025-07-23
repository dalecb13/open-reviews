import { Profile } from "./profile.model";

export type Review = {
  id: number;
  title: string;
  review: string;
  stars: number;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
}
