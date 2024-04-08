export interface ILocationDTO {
  bookId: string;
  userId: string;
  takeOnDate: Date; // data que pegou empresatado
  devolutionDate: Date; // dataDevolucaoPrevista
  status: string; // disponível / Não disponível
}
