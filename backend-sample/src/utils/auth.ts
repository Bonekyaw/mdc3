export const checkPhoneExist = (user: any) => {
  // // This is not middleware
  if (user) {
    const err: any = new Error("This phone number has already registered!.");
    err.status = 409;
    err.code = "Error_AlreadyRegistered";
    throw err;
  }
};

export const checkPhoneIfNotExist = (user: any) => {
  if (!user) {
    const err: any = new Error("This phone number has not registered!.");
    err.status = 401;
    err.code = "Error_Unauthenticated";
    throw err;
  }
};

export const checkOtpPhone = (otpCheck: any) => {
  if (!otpCheck) {
    const err: any = new Error("Phone number is incorrect.");
    err.status = 400;
    err.code = "Error_Invalid";
    throw err;
  }
};

export const checkOtpErrorIfSameDate = (isSameDate: boolean, otpCheck: any) => {
  if (isSameDate && otpCheck.error === 5) {
    const err: any = new Error(
      "OTP is wrong 5 times today. Try again tomorrow."
    );
    err.status = 401;
    err.code = "Error_OverLimit";
    throw err;
  }
};

export const checkUser = (user: any) => {
  if (!user) {
    const err: any = new Error("This account has not registered!.");
    err.status = 401;
    err.code = "Error_Unauthenticated";
    throw err;
  }
};
