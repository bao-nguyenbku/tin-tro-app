import { request } from "@/utils/request";

export const reviewByRenterService = ({ accommodationId, points }) => {
  return request.post(`/review`, { accommodationId, rating: points });
}