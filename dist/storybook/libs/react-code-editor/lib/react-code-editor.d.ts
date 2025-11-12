export interface CodeEditorProps {
    initialCode?: string;
    theme?: 'light' | 'dark';
    enableRunButton?: boolean;
    onCodeChange?: (code: string) => void;
    onRun?: (code: string) => void;
    endExecution?: boolean | null;
    appendStdout?: string | null;
    appendStderr?: string | null;
}
export declare function ReactCodeEditor({ initialCode, theme, enableRunButton, onCodeChange, onRun, endExecution, appendStdout, appendStderr, }: CodeEditorProps): import("react/jsx-runtime").JSX.Element;
export default ReactCodeEditor;
