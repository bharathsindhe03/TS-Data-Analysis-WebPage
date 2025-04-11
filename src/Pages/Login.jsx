import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SignInWithEmail from "../Services/Login";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import InputAdornment from "@mui/material/InputAdornment";
import { useNotifications } from "@toolpad/core/useNotifications";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const notifications = useNotifications();

  const handleLogin = async (e) => {
    e.preventDefault();
    await SignInWithEmail(
      userEmail,
      userPassword,
      rememberMe,
      navigate,
      notifications
    );
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (localStorage.getItem("isRememberMe") === "true") {
      setUserPassword(localStorage.getItem("userPassword") || "");
      setUserEmail(localStorage.getItem("userEmail") || "");
      setRememberMe(true);
    }
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ p: 4, width: { xs: "100%", sm: 500 }, boxShadow: 3 }}>
        <Box
          onSubmit={handleLogin}
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
            Login
          </Typography>
          <FormControl>
            <TextField
              id="outlined-basic"
              type="text"
              label="Email"
              variant="outlined"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              onChange={(e) => setUserPassword(e.target.value)}
              value={userPassword}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Box textAlign="left">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setRememberMe(e.target.checked)}
                  checked={rememberMe}
                />
              }
              label="Remember Me"
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
        <Typography align="center" sx={{ py: 2 }}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </Typography>
      </Card>
    </Box>
  );
}
