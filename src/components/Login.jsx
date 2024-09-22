import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;


/*
Imagine a user wants to log into an application using their email and password. Here's how the login function processes this:

User Input:

The user enters their email and password into the login form and submits it.
For instance, the user provides the following credentials:
Email: johndoe@example.com
Password: securepassword123
Function Call:

The login function is called with the user’s credentials.


1. SETERROR  ======> If there was a previous login attempt that failed and showed an error, this line ensures that error message is cleared before trying to log in again.

2. const session = await authService.login(data);

authService.login(data) sends a request to Appwrite’s authentication service to create a session for the user.
For the credentials provided (johndoe@example.com and securepassword123), Appwrite checks if they match a registered user and creates a session if they do.
Appwrite Context:

Appwrite’s createEmailSession method is used here. If the login is successful, Appwrite returns a session object (e.g., { sessionId: "abc123", userId: "user123" }).


3. if (session) {
  const userData = await authService.getCurrentUser();

authService.getCurrentUser() requests the user’s profile information from Appwrite.
For the logged-in user, Appwrite returns user data (e.g., { userId: "user123", email: "johndoe@example.com", name: "John Doe" }).
Appwrite Context:

Appwrite’s get() method on the Account class retrieves the profile details of the currently authenticated user.

4. if (userData) dispatch(authLogin(userData));

dispatch(authLogin(userData)) sends an action to the Redux store to set the user as logged in.
Redux updates its state to reflect that the user is now authenticated and stores the user’s data.
Redux Context:

The authLogin action is defined in the Redux slice and updates the authentication state (status set to true and userData populated with the user’s profile).

5.  navigate("/");
After a successful login, it takes the user to the main page of the application.
React Router Context:

navigate("/") uses the useNavigate hook from react-router-dom to programmatically change the route to the home page.




















*/