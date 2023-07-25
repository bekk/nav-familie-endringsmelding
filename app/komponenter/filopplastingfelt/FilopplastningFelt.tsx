import { DownloadIcon } from '@navikt/aksel-icons';
import { BodyShort, Table } from '@navikt/ds-react';
import { Form, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

import { formaterDato } from '~/utils/formaterDato';

import css from './filopplastningfelt.module.css';

const FilopplastningFelt = () => {
  const [filer, settFiler] = useState<File[]>([]);
  const submit = useSubmit();

  const håndterLastOppFil = (nyeFiler: File[]) => {
    settFiler(gamleFiler => [...gamleFiler, ...nyeFiler]);

    nyeFiler.forEach(fil => {
      const formdata = new FormData();
      formdata.append('file', fil);
      submit(formdata, {
        method: 'post',
        encType: 'multipart/form-data',
      });
    });
  };

  return (
    <>
      <Form
        method="post"
        encType="multipart/form-data"
        className={`${css.dokumentasjonKonteiner}`}
      >
        <Dropzone onDrop={acceptedFiles => håndterLastOppFil(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section {...getRootProps()}>
              <input name="fileInput" {...getInputProps()} />
              <DownloadIcon title="nedlastningsikon" />
              <BodyShort>Last opp dokumentasjon</BodyShort>
            </section>
          )}
        </Dropzone>
      </Form>

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
