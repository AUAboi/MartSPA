import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import emailService from "./emailService";
import { toast } from "react-toastify";

const initialState = {
  sendingEmail: false, //equavelent to isLoading
  emailSentSuccess: false, //equavelent to success
  emailSentMessage: "",
};


//Send automated email
export const sendAutoMail=createAsyncThunk("email/autoEmail",
  async(emailData,thunkApi)=>{
    try {
      return emailService.sendAutoEmail(emailData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
)
const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    EMAIL_RESET(state) {
      state.sendingEmail = false;
      state.emailSentSuccess = false;
      state.emailSentMessage = "";
    },
  },
  extraReducers: (builder) => {
    //for registering the user
    builder
      .addCase(sendAutoMail.pending, (state, action) => {
        state.sendingEmail = true;
      })

      .addCase(sendAutoMail.fulfilled, (state, action) => {
        state.sendingEmail = false;
        state.emailSentSuccess = true
        state.emailSentMessage=action.payload.message
        toast.success(action.payload.message)
      })

      .addCase(sendAutoMail.rejected, (state, action) => {
        state.sendingEmail = false;
        state.emailSentSuccess = false
        state.emailSentMessage=action.payload.message
        toast.success(action.payload.message)
      })}
});

export const { EMAIL_RESET } = emailSlice.actions;

export default emailSlice.reducer;
