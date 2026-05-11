import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy, Terminal } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
    showLineNumbers?: boolean;
}

const LANGUAGE_LABELS: Record<string, string> = {
    bash: 'Bash',
    sh: 'Shell',
    zsh: 'Zsh',
    typescript: 'TypeScript',
    tsx: 'TSX',
    javascript: 'JavaScript',
    jsx: 'JSX',
    python: 'Python',
    php: 'PHP',
    json: 'JSON',
    yaml: 'YAML',
    yml: 'YAML',
    css: 'CSS',
    html: 'HTML',
    sql: 'SQL',
    dockerfile: 'Dockerfile',
    nginx: 'Nginx',
    ini: 'INI',
    toml: 'TOML',
    text: 'TEXT',
};

export default function CodeBlock({
    code,
    language = 'bash',
    filename,
    showLineNumbers = false,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const label = filename ?? LANGUAGE_LABELS[language.toLowerCase()] ?? language.toUpperCase();

    return (
        <div className="my-6 rounded-xl overflow-hidden border border-[#1e293b] shadow-lg shadow-black/30">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f172a] border-b border-[#1e293b]">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Terminal className="h-3.5 w-3.5 text-slate-500" />
                    <span className="font-mono text-xs font-medium text-slate-300">{label}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md
                               text-slate-400 hover:text-slate-200 hover:bg-slate-700/60
                               border border-transparent hover:border-slate-600
                               transition-all duration-150 font-medium"
                    aria-label="Copiar código"
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400">¡Copiado!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copiar</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code */}
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={language}
                    style={atomDark}
                    showLineNumbers={showLineNumbers}
                    wrapLongLines={false}
                    customStyle={{
                        margin: 0,
                        padding: '1.25rem 1.5rem',
                        background: '#0d1117',
                        fontSize: '0.8125rem',
                        lineHeight: '1.7',
                        borderRadius: 0,
                    }}
                    lineNumberStyle={{
                        color: '#374151',
                        paddingRight: '1.5rem',
                        minWidth: '2.5rem',
                        userSelect: 'none',
                    }}
                    codeTagProps={{
                        style: { fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace" },
                    }}
                >
                    {code.trim()}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
