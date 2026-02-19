import { Container } from "@mui/material";
import ServiceLogForm from "./components/ServiceLogForm";
import ServiceLogTable from "./components/ServiceLogTable";

export default function App() {
  return (
    <Container sx={{ mt: 4 }}>
      <ServiceLogForm />
      <ServiceLogTable />
    </Container>
  );
}
