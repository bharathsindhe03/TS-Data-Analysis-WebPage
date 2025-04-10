import { signOut } from "firebase/auth";
import { auth } from "../Uitls/Config";

export default function handlelogout(navigate, notifications) {
  signOut(auth)
    .then(() => {
      navigate("/");
      notifications.show("Signed out successfully", {
        severity: "success",
        autoHideDuration: 3000,
      });
    })
    .catch((error) => {
      console.log(error);
      notifications.show("Something went wrong", {
        severity: "error",
        autoHideDuration: 3000,
      });
    });
}
