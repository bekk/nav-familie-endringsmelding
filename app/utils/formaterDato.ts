import { format } from 'date-fns';

export const formaterDato = (datoString: string | number) => {
  return format(new Date(datoString), 'HH:mm, dd.MM.yy');
};
