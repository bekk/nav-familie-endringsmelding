import { DownloadIcon } from '@navikt/aksel-icons';
import { BodyShort, Table } from '@navikt/ds-react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

import { formaterDato } from '~/utils/formaterDato';

import css from './filopplastningfelt.module.css';

const FilopplastningFelt = () => {
  const [filer, settFiler] = useState<File[]>([]);

  const håndterLastOppFil = (nyeFiler: File[]) => {
    settFiler(gamleFiler => [...gamleFiler, ...nyeFiler]);
  };

  return (
    <>
      <Dropzone onDrop={opplastedeFiler => håndterLastOppFil(opplastedeFiler)}>
        {({ getRootProps, getInputProps }) => (
          <section
            className={`${css.dokumentasjonKonteiner}`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <section>
              <DownloadIcon title="nedlastningsikon" />
              <BodyShort>Last opp dokumentasjon</BodyShort>
            </section>
          </section>
        )}
      </Dropzone>

      {filer.length > 0 && (
        <section>
          <BodyShort>Filer som er lastet opp:</BodyShort>

          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                <Table.HeaderCell scope="col">Størrelse</Table.HeaderCell>
                <Table.HeaderCell scope="col">Sist Endret</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filer.map((fil: File) => {
                return (
                  <Table.Row key={fil.name}>
                    <Table.HeaderCell scope="row">{fil.name}</Table.HeaderCell>
                    <Table.DataCell>{fil.size}</Table.DataCell>
                    <Table.DataCell>
                      {formaterDato(fil.lastModified)}
                    </Table.DataCell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </section>
      )}
    </>
  );
};

export default FilopplastningFelt;
