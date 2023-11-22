export enum TypeActivity {
  Surgery = 0,
  Appointment = 1
}

export const TypeActivityDisplayNames: {
  [key: number]: string;
  [key: string]: string;
} = {
  [TypeActivity.Surgery]: 'Cirurgia',
  [TypeActivity.Appointment]: 'Consulta',
};