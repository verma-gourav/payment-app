interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary text-white hover:bg-dark",
  secondary: "bg-light text-primary hover:bg-secondary",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base rounded-4xl",
  lg: "px-6 py-3 text-lg rounded-2xl",
};

const Button = ({
  variant,
  size,
  text,
  onClick,
  className,
  loading = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`gap-2 font-medium transition-all
            ${variantClasses[variant]} ${sizeClasses[size]}
            ${disabled || loading ? "cursor-not-allowed" : "cursor-pointer"}
            ${className}
            `}
    >
      {loading ? <span>Loading...</span> : <span>{text}</span>}
    </button>
  );
};

export default Button;
