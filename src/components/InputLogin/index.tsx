import { InputHTMLAttributes } from "react";

export function InputLogin(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum" />
  )
}