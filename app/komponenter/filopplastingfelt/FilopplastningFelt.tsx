import { DownloadIcon } from '@navikt/aksel-icons';
import { Table } from '@navikt/ds-react';
import { Form, useActionData, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

import css from './filopplastningfelt.module.css';

const FilopplastningFelt = () => {
  const [filer, settFiler] = useState<File[]>([]);
  const submit = useSubmit();
  const actionData = useActionData();

  console.log(actionData);

  const håndterLastOppFil = (nyeFiler: File[]) => {
    settFiler(gamleFiler => [...gamleFiler, ...nyeFiler]);

    nyeFiler.forEach(fil => {
      const formdata = new FormData();
      formdata.append('file', fil);
      submit(formdata, {
        method: 'post',
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
              <p>
                <DownloadIcon title="a11y-title" /> Last opp dokumentasjon
              </p>
            </section>
          )}
        </Dropzone>
      </Form>

      <section>
        <p>Filer som er lastet opp:</p>

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
                    {new Date(fil.lastModified).toDateString()}
                  </Table.DataCell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </section>
    </>
  );
};

export default FilopplastningFelt;
