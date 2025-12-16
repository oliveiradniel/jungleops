export function formatTermDateToBR(term: string): string {
  const [year, month, day] = term.split('-');

  return `${day}/${month}/${year}`;
}

export function formatDateToBR(date: Date): string {
  return new Date(date).toLocaleDateString('pt-BR');
}

export function formatDateToBRWithHour(date: Date): string {
  return new Date(date).toLocaleString('pt-BR');
}
