import React from 'react';
import { Mail } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const EmailInput: React.FC<InputProps> = (props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      role="input"
      aria-required="true"
      className="poppins-semibold text-complementaryLight mb-8"
    >
      <label htmlFor="email" className="block text-md font-medium text-white">
        Email
      </label>
      <div className="relative flex items-center">
        <Mail className="absolute left-3 text-white/70" size={20} />
        <input
          {...props}
          type="email"
          name="email"
          autoComplete="email"
          className={`${
            props.className || ''
          } w-full pl-10 bg-transparent border-b-2 border-white/20 focus:border-blue-400 transition-colors duration-200 focus:ring-0 placeholder-white/50 text-white`}
          onFocus={(e) => {
            if (props.onFocus) props.onFocus(e);
            setIsFocused(true);
          }}
          onBlur={(e) => {
            if (props.onBlur) props.onBlur(e);
            setIsFocused(false);
          }}
        />
      </div>
    </div>
  );
};

export default EmailInput;
