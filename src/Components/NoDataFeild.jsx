import { Box, Typography } from "@mui/material";

export default function NoDataField() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { xs: "30vh", sm: "40vh", md: "50vh" },
        width: "100%",
        px: 2,
      }}
    >
      <Typography align="center" variant="h4">
        No Data Available
      </Typography>
    </Box>
  );
}
