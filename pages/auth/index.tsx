import React from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../lib/user/AuthContext';
import { useState } from 'react';
import firebase from 'firebase/compat/app';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import GoogleIcon from '../../public/icons/googleicon.png';
import Image from 'next/image';
import EmailInput from '../../components/authComponents/EmailInput';
import PasswordInput from '../../components/authComponents/PasswordInput';
/**
 * A page that allows the user to sign in.
 *
 * Route: /auth
 */
export default function AuthPage() {
  const { isSignedIn, signInWithGoogle, updateUser } = useAuthContext();
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordResetDialog, setPasswordResetDialog] = useState(false);
  const [sendVerification, setSendVerification] = useState(false);
  const [signInOption, setSignInOption] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const signIn = () => {
    setSendVerification(false);
    firebase
      .auth()
      .signInWithEmailAndPassword(currentEmail, currentPassword)
      .then(async ({ user }) => {
        // Signed in
        if (!user.emailVerified) {
          setSendVerification(true);
          throw new Error('Email is not verified. Verify your email before logging in.');
        }
        await updateUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(currentEmail, currentPassword)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        //send email verification
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            router.push('/auth');
            alert(
              'Account created! Check your email/spam folder to verify your account and log in.',
            );
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const sendResetEmail = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(currentEmail)
      .then(() => {
        alert('Password reset email sent');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setErrorMsg(errorMessage);
      });
  };

  const sendVerificationEmail = () => {
    //send email verification
    try {
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          router.push('/auth');
          alert('Verification email sent, check your email to verify your account and log in');
        });
    } catch (error) {
      alert(
        'There has been a problem sending a verfication email.\nWait a few minutes before sending another request.',
      );
    }
  };

  function handleSubmit() {
    if (signInOption) {
      signIn();
    } else {
      signUp();
    }
  }

  const prettyPrint = (s: string) => {
    if (s.startsWith('Firebase')) return s.substring(10, s.indexOf('('));
  };

  if (isSignedIn) {
    router.push('/profile');
  }

  return (
    <>
      <section className="min-h-screen mb-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ">
        <div className="mt-24 md:mt-0 py-2 md:px-16 px-0 flex items-center justify-center flex-wrap">
          <div className="xl:w-1/2 lg:w-2/3 w-5/6 my-4">
            <section
              id="signInSection"
              className="bg-gradient-to-b from-gray-900/90 to-indigo-950/90 backdrop-blur-sm 2xl:min-h-[30rem] min-h-[28rem] rounded-lg p-6 border border-blue-500/20 shadow-lg shadow-purple-500/20"
            >
              {!passwordResetDialog ? (
                <>
                  <h1 className="md:text-3xl text-2xl text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-4 poppins-bold">
                    {signInOption ? 'Login' : 'Create an account'}
                  </h1>
                  <div className="text-center text-blue-200/80 mt-4 mb-12 poppins-semibold">
                    {signInOption ? ' New to HackUTD?' : 'Already have an account?'}{' '}
                    <span
                      onClick={() =>
                        signInOption ? setSignInOption(false) : setSignInOption(true)
                      }
                      className="text-blue-400 cursor-pointer underline hover:text-blue-300 transition-colors"
                    >
                      {signInOption ? 'Register here!' : 'Sign in'}
                    </span>
                  </div>
                  <React.Fragment>
                    <form
                      onKeyDown={(keyEvent) => {
                        if (keyEvent.key === 'Enter') {
                          keyEvent.preventDefault();
                        }
                      }}
                      onSubmit={handleSubmit}
                      className="mt-4"
                    >
                      <EmailInput
                        onChange={(e) => setCurrentEmail(e.target.value)}
                        placeholder="Enter your email address"
                        value={currentEmail}
                      />
                      <PasswordInput
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your password"
                      />

                      <div className="inline-flex md:flex justify-between md:flex-row flex-col-reverse poppins-semibold text-sm">
                        <div className="text-blue-400">
                          <input
                            className="mr-2 r text-blue-400 focus:ring-0 border border-blue-400 text-sm cursor-pointer bg-transparent"
                            type="checkbox"
                            onClick={() => setRememberMe(!rememberMe)}
                          />
                          Remember me
                        </div>
                        <div
                          className="hover:text-blue-300 transition-colors cursor-pointer text-left text-blue-400 mb-4 md:mb-0"
                          onClick={() => {
                            setPasswordResetDialog(true);
                            setErrorMsg('');
                            setSendVerification(false);
                          }}
                        >
                          Forgot password?
                        </div>
                        <input className="hidden" type="submit" value="Submit" />
                      </div>
                      <div className="flex justify-center mt-6 mb-4">
                        <button
                          type="button"
                          className="rounded-lg text-base w-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all px-4 py-2"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          {signInOption ? 'Sign in' : 'Create an account'}
                        </button>
                      </div>
                    </form>
                    <div className="poppins-regular text-center text-red-400">
                      {prettyPrint(errorMsg)}
                    </div>
                    <div className="poppins-regular text-blue-200 flex justify-center">
                      <p>or continue with</p>
                    </div>
                    <button
                      className="mt-2 px-4 py-2 w-full rounded-lg border border-blue-500/20 text-blue-200 bg-gray-900/50 backdrop-blur-sm my-4 text-base font-bold text-center flex items-center justify-center hover:bg-gray-800/50 transition-colors"
                      onClick={() => signInWithGoogle()}
                    >
                      <Image src={GoogleIcon} alt="GoogleIcon" width={25} height={25} />
                      <p className="mx-2">Sign in with Google</p>
                    </button>
                  </React.Fragment>
                </>
              ) : (
                <React.Fragment>
                  <div className="text-left">
                    <ArrowBackIcon
                      className="cursor-pointer text-blue-400 hover:text-blue-300 transition-colors"
                      onClick={() => {
                        setPasswordResetDialog(false);
                        setErrorMsg('');
                      }}
                    />
                  </div>
                  <h1 className="md:text-3xl text-2xl font-black text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-4">
                    Reset Password
                  </h1>
                  <div className="text-center text-blue-200/80 mt-4 mb-12">
                    Enter your email address and we&apos;ll send you a link to reset your password.
                  </div>

                  <input
                    className="w-full rounded-md border border-blue-500/20 p-2 mb-4 bg-gray-900/50 text-blue-200 placeholder:text-blue-200/50"
                    value={currentEmail}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    type="text"
                    name="email"
                    autoComplete="email"
                    placeholder="Email Address*"
                  ></input>
                  <div className="flex justify-center mt-6 mb-4">
                    <button
                      type="button"
                      className="rounded-full text-base w-full text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all px-4 py-2"
                      onClick={() => {
                        sendResetEmail();
                        setErrorMsg('');
                      }}
                    >
                      Send reset link
                    </button>
                  </div>
                  <div className="text-left text-red-400">{errorMsg}</div>
                </React.Fragment>
              )}
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
