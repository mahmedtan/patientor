import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, Header, Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    void (async function () {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patient);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, [id]);
  return (
    <Container text>
      <Header>
        {patient?.name}{" "}
        <Icon name={patient?.gender === "female" ? "venus" : "mars"} />
      </Header>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
    </Container>
  );
};

export default PatientPage;
