"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";
import { FirebaseError } from "firebase/app";

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

  // Only run client-side code after component is mounted
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
      <Loader2 className="animate-spin" />
    </div>
  );

  // Don't attempt to render client-specific content during SSR
  if (!isClient) {
    return <div className="flex justify-center items-center p-8">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {!confirmationResult && (
        <form onSubmit={requestOtp} className="w-full max-w-xs">
          <Input
            className="text-black mb-2"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890"
          />
          <p className="text-sm text-gray-500 mb-4">Please enter your phone number</p>
        </form>
      )}

      {confirmationResult && (
        <div className="my-4">
          <p className="text-sm text-gray-500 mb-2">Enter the OTP sent to your phone</p>
          <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
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
        </div>
      )}
      
      <Button
        disabled={isPending || resendCountdown > 0 || !phoneNumber}
        onClick={() => requestOtp()}
        className="mt-5"
      >
        {resendCountdown > 0 ? `Resend OTP in ${resendCountdown}` : isPending ? "Sending OTP" : "Send OTP"}
      </Button>

      <div className="p-4 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
      <div id="recaptcha-container" />

      {isPending && loadingIndicator}
    </div>
  );
}

export default OtpLogin;