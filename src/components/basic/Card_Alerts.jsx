import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

export const UsingMockData_warning = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Alert severity="warning">This widget is currently using mock data</Alert>
    </Box>
  );
};
