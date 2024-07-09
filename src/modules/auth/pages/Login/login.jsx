import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/auth.js";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATHES } from "../../../../constants/routesPathes.js";
import useFirebaseLogic from "../../../firebase/hooks/useFirebaseLogic";
import { userProfile } from "../../redux/profile.js";
import {toast} from "react-hot-toast";
const Login = () => {
  const { fcmToken, requestNotificationPermission } = useFirebaseLogic();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state) => state.user.loading);
  
  useEffect(() => {
    requestNotificationPermission();
  }, []);

console.log("FCM TOKEN", fcmToken)
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    // validationSchema:LoginSchema,
    onSubmit: (values) => {
        if(! fcmToken) {
            toast.error('please grant notification permissions')
            formik.setSubmitting(false)
            return;
        }
      dispatch(userLogin({...values, fcm_token: fcmToken }))
        .unwrap()
        .then(() => {
          dispatch(userProfile());
          navigate(ROUTES_PATHES.DASHBOARD);
        });
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <Container
      component="main"
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundImage: "url('assets/backGround.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          margin: "1rem auto",
          position: "relative",
          width: "70%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffffffde",
          padding: "2rem",
          borderRadius: ".5rem",
        }}
      >
        <img
          src="/assets/logo.png"
          alt="logo"
          style={{ width: 300, height: 300, margin: "1rem auto" }}
        />
        <Typography component="h1" sx={{ fontWeight: "bold" }} variant="h5">
          Sign in
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            sx={{ color: "white" }}
            required
            fullWidth
            variant="outlined"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              autoFocus
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div style={{ width: "100%", color: "red" }}>
                {formik.errors.phone}
              </div>
            )}
          </FormControl>
          <FormControl
            sx={{ color: "white" }}
            required
            fullWidth
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    required
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ width: "100%", color: "red" }}>
                {formik.errors.password}
              </div>
            )}
          </FormControl>
          <Button
            type="submit"
            disabled={loading}
            fullWidth
            variant="text"
            sx={{
              mt: 3,
              mb: 2,
              fontWeight: "bold",
              fontSize: "22px",
              backgroundColor: "#bd0f0f",
              color: "white",
              borderRadius: ".5rem",
              transition: "all .5s ease-in-out",
              ":hover": {
                backgroundColor: "black",
                color: "#bd0f0f",
              },
            }}
            // disabled={loading}
          >
            Sign In
          </Button>
        </form>
        {/* <Copyright variant={"h6"} /> */}
      </Box>
    </Container>
  );
};

export default Login;
