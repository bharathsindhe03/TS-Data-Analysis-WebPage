import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Uitls/Config";

const handleUserRegister = async (
  userEmail,
  userPassword,
  userConfirmPassword,
  navigate,
  notifications
) => {
  console.log(userEmail, userPassword, userConfirmPassword);

  if (!userEmail || !userPassword) {
    notifications.show("Provide Email and Password", {
      severity: "error",
      autoHideDuration: 3000,
    });
    return;
  }
  if (userConfirmPassword != userPassword) {
    notifications.show("Password are not matching", {
      severity: "error",
      autoHideDuration: 3000,
    });
    return;
  }
  try {
    await createUserWithEmailAndPassword(auth, userEmail, userPassword);

    notifications.show("Successfull Sign Up Please Login", {
      severity: "success",
      autoHideDuration: 3000,
    });
    navigate("/");
  } catch (error) {
    console.log(error);
    if (error.code === "auth/email-already-in-use") {
      notifications.show("Email Already Exists", {
        severity: "error",
        autoHideDuration: 3000,
      });
    } else {
      notifications.show("Password should be at least 6 characters ", {
        severity: "error",
        autoHideDuration: 3000,
      });
    }
  }
};

export default handleUserRegister;
