export type UserT = {
  id: string;
  username: string;
  postId: string;
};

export interface PostI {
  userId: number;
  id: string;
  caption: string;
  comments: number;
  date: string;
  permalink: string;
  user: UserT;
  likes: number;
}
