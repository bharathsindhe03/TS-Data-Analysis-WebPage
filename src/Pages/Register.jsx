import { useState } from "react";
import handleUserRegister from "../Services/Register";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { useNotifications } from "@toolpad/core/useNotifications";
import { validateRegexPassword } from "../Uitls/RegrexPassword";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function Register() {

  const [userEmail, setUserEmail] = useState("");
  const [userPasword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);
  
  const navigate = useNavigate();
  const notifications = useNotifications();

  const handlePasswordChange = (password) => {
    const { isValid, errorMessage } = validateRegexPassword(password);
    setPasswordError(errorMessage);
    setIsPasswordValid(isValid);
    setShowErrorPassword(!isValid);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isPasswordValid) {
      await handleUserRegister(
        userEmail,
        userPasword,
        userConfirmPassword,
        navigate,
        notifications
      );
    } else {
      notifications.show("Create a Strong password", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const passwordValidate = [
    { id: 1, errorMsg: "At least 8 characters" },
    { id: 2, errorMsg: "One uppercase letter" },
    { id: 3, errorMsg: "One lowercase letter" },
    { id: 4, errorMsg: "One number" },
    { id: 5, errorMsg: "One special character" },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ p: 4, width: { xs: "100%", sm: 500 }, boxShadow: 3 }}>
        <Box
          onSubmit={handleRegister}
          component="form"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Register
          </Typography>
          <FormControl>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              input={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              error={showErrorPassword}
              onChange={(e) => {
                setShowErrorPassword(true);
                setUserPassword(e.target.value);
                handlePasswordChange(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-confirm-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) => setUserConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
          {showErrorPassword && (
            <Box sx={{ ml: "-2rem" }}>
              <ul
                style={{
                  padding: 0,
                  margin: 0,
                  transform: "scale(0.8)",
                  listStyle: "none",
                }}
              >
                {passwordValidate.map((p) => (
                  <li key={p.id}>
                    {!passwordError.includes(p.id) && (
                      <FormLabel error>{p.errorMsg}</FormLabel>
                    )}
                  </li>
                ))}
              </ul>
            </Box>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </Box>
        <Typography align="center" sx={{ py: 2 }}>
          Have an account? <Link href="/">Login</Link>
        </Typography>
      </Card>
    </Box>
  );
}
