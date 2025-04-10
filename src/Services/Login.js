import { auth } from "../Uitls/Config";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignInWithEmail = async (
  userEmail,
  userPassword,
  rememberMe,
  navigate,
  notifications
) => {
  if (!userEmail || !userPassword) {
    console.error("Provide Email and Password");
    notifications.show("Provide Email and Password", {
      severity: "error",
      autoHideDuration: 3000,
    });
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, userEmail, userPassword);
    notifications.show("Successfull Login", {
      severity: "success",
      autoHideDuration: 3000,
    });
    if (rememberMe) {
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("userPassword", userPassword);
      localStorage.setItem("isRememberMe", String(rememberMe));
    } else {
      localStorage.clear();
    }
    navigate("/home");
  } catch (error) {
    console.log("error:", error);
    notifications.show("Invalid Credential", {
      severity: "error",
      autoHideDuration: 3000,
    });
  }
};

export default SignInWithEmail;
