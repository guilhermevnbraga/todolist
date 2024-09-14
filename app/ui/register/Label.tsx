export default function Label({
    children,
    label,
}: {
    children: React.ReactNode;
    label: string;
}) {
    return (
        <label className="mb-2">
            {label}
            {children}
        </label>
    );
}
