export interface IDevolutionDTO {
  id: string;
  bookId: string;
  userId: string;
  effectiveDevolution?: Date; // dataDevolucaoEfetiva
  conditionDelivery: string; // boas condições / péssimas condições.
}
