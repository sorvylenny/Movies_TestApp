export interface Movies {
  id          : number;
  title       : string;
  description : string;
  rating      : string;
  duration    : string;
  genre       :string;
  releaseDate : string;
  image?      : string;
  trailerLink : string;
  selected?    : boolean;
}
