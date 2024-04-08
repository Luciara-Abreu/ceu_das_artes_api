export interface IBookDTO {
  id: string;
  title: string;
  author: string;
  yearPublication?: Date;
  genre: string;
  publisher: string; // editora
  quantityPages: number;
  cover: string;
  quantityBook: number; // Adicionando a quantidade disponível de livros do mesmo title e author claro!!
  booksInStock?: number; // quantidade de livros em estoque
}
