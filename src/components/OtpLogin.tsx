"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";
import { FirebaseError } from "firebase/app";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function OtpLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  useEffect(() => {
    if (!isClient) return;

    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      setRecaptchaVerifier(recaptchaVerifier);

      return () => {
        recaptchaVerifier.clear();
      };
    } catch (error) {
      console.error("Failed to initialize recaptcha:", error);
    }
  }, [isClient]);

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp();
    }
  }, [otp]);

  const verifyOtp = async () => {
    if (!isClient) return;

    startTransition(async () => {
      setError(null);

      if (!confirmationResult) {
        setError("Please request OTP first");
        return;
      }

      try {
        await confirmationResult.confirm(otp);
        router.push("/");
      } catch (error) {
        console.error(error);
        setError("Failed to verify OTP. Please check the OTP.");
      }
    });
  };

  const requestOtp = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!isClient) return;

    setResendCountdown(60);

    startTransition(async () => {
      setError(null);

      if (!recaptchaVerifier) {
        setError("Recaptcha verifier is not initialized");
        return;
      }

      try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        setConfirmationResult(confirmationResult);
        setSuccess("OTP sent successfully");
      } catch (err: unknown) {
        console.error(err);
        setResendCountdown(0);
        if (err instanceof FirebaseError) {
          if (err.code === "auth/invalid-phone-number") {
            setError("Invalid phone number. Please check the number.");
          } else if (err.code === "auth/too-many-requests") {
            setError("Too many requests. Please try again later.");
          } else {
            setError(err.message);
          }
        } else {
          setError("An unexpected error occurred");
        }
      }
    });
  };

  const loadingIndicator = (
    <div className="flex justify-center items-center">
      <Loader2 className="animate-spin text-white" />
    </div>
  );

  if (!isClient) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Phone Verification</h2>

        {!confirmationResult && (
          <form onSubmit={requestOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="US"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value || "")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your phone number with country code
              </p>
            </div>
          </form>
        )}

        {confirmationResult && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-xs text-gray-500 text-center">
              Enter the 6-digit code sent to your phone
            </p>
          </div>
        )}

        <Button
          disabled={isPending || resendCountdown > 0 || !phoneNumber}
          onClick={() => requestOtp()}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          {resendCountdown > 0
            ? `Resend OTP in ${resendCountdown}`
            : isPending
            ? "Processing..."
            : "Send OTP"}
        </Button>

        <div className="mt-4 text-center">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
        </div>

        <div id="recaptcha-container" />

        {isPending && loadingIndicator}
      </div>
    </div>
  );
}

export default OtpLogin;