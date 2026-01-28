export default function Input({ input, onChange }) {
  return (
    <>
      {input?.label &&
        <label htmlFor={input.name} className="block text-xs/6 font-medium">
          {input.label}
        </label>
      }
      <input
        dir="auto"
        id={input.name}
        name={input.name}
        type={input.type}
        autoComplete={input.name}
        placeholder={input.placeholder}
        required={input.required}
        disabled={input.disabled}
        onChange={onChange}
        className="block w-full rounded-xl py-1.5 px-3 shadow-sm border bg-transparent border-gray-400/25 placeholder:text-gray-400 placeholder:text-xs focus:outline-none focus:border-foreground sm:text-sm sm:leading-6"
      />
      {input.label_description &&
        <p className="text-[9px] leading-3 mt-1 text-gray-400 mb-1 ml-2">{input.label_description}</p>
      }
    </>
  )
}