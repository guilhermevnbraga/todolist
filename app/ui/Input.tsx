import { useState, useEffect, useRef } from 'react';

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
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onInvalid?: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
    const [inputValue, setInputValue] = useState(value || '');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 10}px`;
        }
    }, [inputValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value.trim());
        if (onChange) {
            onChange(e);
        }
    };

    return type === 'textarea' ? (
        <textarea
            ref={textareaRef}
            name={name}
            className={`w-full p-2 mb-1 rounded border-2 focus:outline-none focus:border-sky-400 focus:invalid:border-pink-500 ${inputValue ? 'invalid:border-pink-500' : ''}`}
            required={required}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleChange}
            onInvalid={onInvalid}
            maxLength={140}
            style={{ resize: 'none' }}
        />
    ) : (
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