import { format } from 'date-fns';

export const formaterDato = (datoString: string) => {
  return format(new Date(datoString), 'HH:mm, dd.MM.yy');
};
