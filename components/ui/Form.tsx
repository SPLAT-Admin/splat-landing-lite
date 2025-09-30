import { forwardRef } from "react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import SplatCaptcha, { type SplatCaptchaProps } from "@/components/SplatCaptcha";

const labelClass = "text-lg font-semibold text-white";
const helperClass = "mt-2 text-sm text-white/55";
const baseInputClass =
  "mt-3 w-full rounded-xl border border-white/20 bg-black/85 px-4 py-3 text-2xl font-semibold text-white placeholder-white/50 shadow-[0_25px_55px_rgba(133,23,37,0.18)] focus:border-[#db1d33] focus:outline-none focus:ring-2 focus:ring-[#db1d33]/60";
const textareaClass = baseInputClass;

export const formSectionClass =
  "mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-black/70 p-[1px] shadow-[0_40px_90px_rgba(0,0,0,0.45)]";

export const formCardBodyClass =
  "rounded-[calc(1.5rem-1px)] bg-black/92 px-8 py-10 sm:px-12 sm:py-12";

export const formButtonClass =
  "flex w-full items-center justify-center rounded-xl bg-[#db1d33] px-8 py-4 text-sm font-black uppercase tracking-[0.4em] text-white shadow-[0_35px_65px_rgba(219,29,51,0.4)] transition hover:scale-[1.03] hover:bg-[#b8172a] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#db1d33]/60 disabled:scale-100 disabled:opacity-60";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string | null;
};

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, hint, error, className = "", ...props }, ref) => {
    return (
      <label className="flex flex-col text-sm text-white/70">
        <span className={labelClass}>{label}</span>
        <input
          ref={ref}
          className={`${baseInputClass} ${className}`.trim()}
          {...props}
        />
        {hint ? <span className={helperClass}>{hint}</span> : null}
        {error ? (
          <span className="mt-2 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </span>
        ) : null}
      </label>
    );
  }
);

FormField.displayName = "FormField";

type FormTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
  error?: string | null;
};

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ label, hint, error, className = "", ...props }, ref) => {
    return (
      <label className="flex flex-col text-sm text-white/70">
        <span className={labelClass}>{label}</span>
        <textarea
          ref={ref}
          className={`${textareaClass} ${className}`.trim()}
          {...props}
        />
        {hint ? <span className={helperClass}>{hint}</span> : null}
        {error ? (
          <span className="mt-2 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </span>
        ) : null}
      </label>
    );
  }
);

FormTextArea.displayName = "FormTextArea";

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  hint?: string;
  error?: string | null;
  options: Array<{ value: string; label: string } | string>;
};

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, hint, error, options, className = "", ...props }, ref) => {
    return (
      <label className="flex flex-col text-sm text-white/70">
        <span className={labelClass}>{label}</span>
        <select
          ref={ref}
          className={`${baseInputClass} appearance-none bg-[url('data:image/svg+xml,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z\' fill=\'%23ffffff\'/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[position:right_1rem_center] bg-no-repeat ${className}`.trim()}
          {...props}
        >
          <option value="">Select</option>
          {options.map((option) => {
            if (typeof option === "string") {
              return (
                <option key={option} value={option}>
                  {option}
                </option>
              );
            }

            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
        {hint ? <span className={helperClass}>{hint}</span> : null}
        {error ? (
          <span className="mt-2 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </span>
        ) : null}
      </label>
    );
  }
);

FormSelect.displayName = "FormSelect";

type FormButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function FormButton({ className = "", ...props }: FormButtonProps) {
  return (
    <button className={`${formButtonClass} ${className}`.trim()} {...props} />
  );
}

type FormCaptchaProps = SplatCaptchaProps & {
  label?: string;
  helper?: string;
};

export function FormCaptcha({
  label = "Verify you’re human",
  helper = "Protected by Cloudflare Turnstile",
  className = "my-6 flex justify-center",
  ...props
}: FormCaptchaProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-sm text-white/70">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
        {label}
      </span>
      <SplatCaptcha className={className} {...props} />
      {helper ? <span className="text-[0.65rem] uppercase tracking-[0.4em] text-white/40">{helper}</span> : null}
    </div>
  );
}

type FormShellProps = {
  children: ReactNode;
  className?: string;
};

export function FormShell({ children, className = "" }: FormShellProps) {
  return (
    <div className={`${formSectionClass} ${className}`.trim()}>
      <div className={formCardBodyClass}>{children}</div>
    </div>
  );
}

export const formStatusMessageClass =
  "rounded-2xl border px-4 py-3 text-center text-base";

export const formHeadingClass = "text-[18pt] font-black tracking-[0.2em] text-[#db1d33]";
