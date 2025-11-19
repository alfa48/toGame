// Função utilitária para calcular dias restantes
const getDaysLeft = (deadline: string) => {
  const today = new Date();
  const endDate = new Date(deadline);
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays : 0; // não mostrar negativo
};
export { getDaysLeft };