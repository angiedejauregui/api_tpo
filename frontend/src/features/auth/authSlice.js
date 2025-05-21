import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users",
        userData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auths/login",
        userData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auths/forgot-password",
        userData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auths/verify-code",
        userData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auths/reset-password",
        userData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  loading: false,
  error: null,
  user: token && user ? JSON.parse(user) : null,
  message: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
        state.message = null;
        state.email = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Forgot Password
      builder
        .addCase(forgotPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.email = action.payload.email;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });

      // Verify Code
      builder
        .addCase(verifyCode.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null;
        })
        .addCase(verifyCode.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.message = action.payload.message;
        })
        .addCase(verifyCode.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // Reset Password
        builder
          .addCase(resetPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
          })
          .addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user.password = action.payload;
            state.message = action.payload.message;
          })
          .addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
          })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;