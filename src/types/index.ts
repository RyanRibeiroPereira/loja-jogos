export interface Game {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  genre: string[];
  rating: number;
  description: string;
  platforms: string[];
  releaseDate: string;
}