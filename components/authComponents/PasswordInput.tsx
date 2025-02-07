import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput: React.FC<InputProps> = (props) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div
      role="input"
      aria-required="true"
      className="poppins-semibold text-complementaryLight mb-8"
    >
      <label htmlFor="password" className="block text-md font-medium text-white">
        Password
      </label>
      <div className="relative flex items-center">
        <LockOutlinedIcon className="absolute left-3 text-white/70" sx={{ fontSize: 20 }} />
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          name="password"
          autoComplete="password"
          className={`${
            props.className || ''
          } w-full pl-10 pr-10 bg-transparent border-b-2 border-white/20 focus:border-blue-400 transition-colors duration-200 focus:ring-0 placeholder-white/50`}
          onFocus={(e) => {
            if (props.onFocus) props.onFocus(e);
            setIsFocused(true);
          }}
          onBlur={(e) => {
            if (props.onBlur) props.onBlur(e);
            setIsFocused(false);
          }}
        />
        <div
          onClick={toggleShowPassword}
          className="absolute right-3 cursor-pointer text-white/70 hover:text-white/90 transition-colors"
        >
          {showPassword ? (
            <VisibilityOffIcon sx={{ fontSize: 20 }} />
          ) : (
            <VisibilityIcon sx={{ fontSize: 20 }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
