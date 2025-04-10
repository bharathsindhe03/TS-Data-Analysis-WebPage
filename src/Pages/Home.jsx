import { get, ref } from "firebase/database";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Box,
  Menu,
  MenuItem,
  styled,
  alpha,
  Typography,
  Container,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { database } from "../Uitls/Config";
import handlelogout from "../Services/Logout";
import { useNavigate } from "react-router-dom";
import PieCharts from "../Components/PieCharts";
import BarCharts from "../Components/BarCharts";
import LineCharts from "../Components/LineCharts";
import ExcelDownloadButton from "../Components/ExcelDownloadButton";
import NoDataField from "../Components/NoDataFeild";
import { useNotifications } from "@toolpad/core/useNotifications";
import { isDartheme } from "../Uitls/ThemeChecker";
export default function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const options = [
    { id: 1, label: "Bar Chart", color: "primary" },
    { id: 2, label: "Pie Chart", color: "secondary" },
    { id: 3, label: "Line Chart", color: "success" },
  ];
  const [selectedButton, setSelectedButton] = useState(0);
  const [selectedData, setSelectedData] = useState("");
  const notifications = useNotifications();

  useEffect(() => {
    const userRef = ref(database, "Data");
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));
        setData(userArray);
      } else {
        console.log("No Data");
      }
    });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: `${isDartheme.matches ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"}`,
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card
        sx={{
          p: { xs: 2, sm: 4 },
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 2,
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", flexGrow: 1 }}>
            Data Analysis
          </Typography>
          <Button
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={() => handlelogout(navigate, notifications)}
          >
            Logout
          </Button>
        </Box>

        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="outlined"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {selectedData === "" ? "Select Data" : selectedData.data}
          </Button>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {data.map((d) => (
              <MenuItem
                onClick={() => {
                  handleClose();
                  setSelectedData(d);
                }}
                disableRipple
                key={d.id}
              >
                {d.data}
              </MenuItem>
            ))}
          </StyledMenu>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            my: 2,
          }}
        >
          {options.map((option) => (
            <Button
              color={option.color}
              key={option.id}
              variant={selectedButton === option.id ? "contained" : "outlined"}
              onClick={() => {
                setSelectedButton(option.id);
              }}
            >
              {option.label}
            </Button>
          ))}
        </Box>

        <Box
          sx={{
            boxShadow: 3,
            mx: { xs: 2, sm: 4, md: 8 },
            px: { xs: 2, sm: 4 },
            py: 4,
          }}
        >
          {(() => {
            switch (selectedButton) {
              case 1:
                return <BarCharts data={selectedData.gData} />;
              case 2:
                return <PieCharts data={selectedData.gData} />;
              case 3:
                return <LineCharts data={selectedData.gData} />;
              default:
                return <NoDataField />;
            }
          })()}
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <ExcelDownloadButton />
        </Box>
      </Card>
    </Container>
  );
}
