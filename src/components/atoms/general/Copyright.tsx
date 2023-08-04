import { Box, Link, Typography } from "@mui/material";

const Copyright = (props: any) => {
  return (
    <Box display="flex" justifyContent="center" bottom={0} width={"100%"}>
      <Typography variant="body2" color="text.secondary" {...props}>
        {"Copyright © "}
        <Link color="inherit">Expensive</Link> {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Copyright;
