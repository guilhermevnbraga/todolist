export default function Input({
    type,
    name,
    pattern,
    required,
    placeholder,
    value,
    onChange,
    onInvalid,
}: {
    type: string;
    name: string;
    pattern?: string;
    required?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onInvalid?: (e: React.FormEvent<HTMLInputElement>) => void;
}) {

    return (
        <input
            type={type}
            name={name}
            pattern={pattern}
            className={`w-full p-2 mb-1 rounded border-2 focus:outline-none focus:border-sky-400 focus:invalid:border-pink-500 ${value ? 'invalid:border-pink-500' : ''}`}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onInvalid={onInvalid}
        />
    );
}