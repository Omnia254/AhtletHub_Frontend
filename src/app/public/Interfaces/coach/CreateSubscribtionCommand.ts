import { AddedSubscribtionFeatureDto } from "./AddedSubscribtionFeatureDto";


export interface CreateSubscribtionCommand {
  name: string;
  price: number;
  durationInMonths: number;
  subscribtionsFeatures: AddedSubscribtionFeatureDto[];
}
