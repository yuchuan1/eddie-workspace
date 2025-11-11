
import React, { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
// import { FaPlay } from 'react-icons/fa';
import styles from './react-code-editor.module.css';

// Define the props interface
export interface CodeEditorProps {
  initialCode?: string;
  theme?: 'light' | 'dark';
  enableRunButton?: boolean;
  onCodeChange?: (code: string) => void;
  onRun?: (code: string) => void;
  // Execution state props (for Phase 3)
  endExecution?: boolean | null;
  appendStdout?: string | null;
  appendStderr?: string | null;
}

export function ReactCodeEditor({
  initialCode = '',
  theme = 'dark',
  enableRunButton = true,
  onCodeChange,
  onRun,
  endExecution,
  appendStdout,
  appendStderr,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [showLibraryInfo, setShowLibraryInfo] = useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [executionStartTime, setExecutionStartTime] = useState<Date | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
    onCodeChange?.(value);
  }, [onCodeChange]);

  const handleRun = useCallback(() => {
    console.log('[CodeEditor] handleRun called');

    // Reset execution state
    setStdout('');
    setStderr('');
    setExecutionTime(null);

    // Start execution timing
    const startTime = new Date();
    console.log('[CodeEditor] Setting start time:', startTime);
    setExecutionStartTime(startTime);

    onRun?.(code);
  }, [code, onRun]);

  const clearOutput = useCallback(() => {
    setStdout('');
    setStderr('');
    setExecutionStartTime(null);
    setExecutionTime(null);
  }, []);

  // Handle execution state changes (for Phase 3 integration)
  React.useEffect(() => {
    const success = endExecution;
    console.log('[CodeEditor] executionEffect triggered, success:', success);

    if (success === null || success === undefined) {
      return;
    }

    const startTime = executionStartTime;
    console.log('[CodeEditor] Current start time:', startTime);

    if (!startTime) {
      console.warn('[CodeEditor] Execution effect triggered but start time is null');
      return;
    }

    const endTime = new Date();
    console.log('[CodeEditor] Setting execution end time:', endTime);

    const calculatedExecutionTime = (endTime.getTime() - startTime.getTime()) / 1000;
    setExecutionTime(calculatedExecutionTime);
    console.log('[CodeEditor] Calculated execution time:', calculatedExecutionTime.toFixed(3));

    const timeStamp = `[${endTime.toLocaleTimeString()}] Execution completed in ${calculatedExecutionTime.toFixed(2)} seconds\n`;

    if (success) {
      console.log('[CodeEditor] Generated success message:', timeStamp);
      setStdout(timeStamp);
    } else {
      console.log('[CodeEditor] Generated error message:', timeStamp);
      // For errors, we'll prepend the timestamp to stderr
      setStderr(prev => {
        if (!prev || prev.trim().length === 0) {
          return timeStamp;
        }
        return `${timeStamp}${prev}`;
      });
    }

    // Reset execution state after setting message
    setExecutionStartTime(null);
    setExecutionTime(null);
  }, [endExecution, executionStartTime]);

  React.useEffect(() => {
    if (appendStdout) {
      setStdout(prev => prev + appendStdout);
    }
  }, [appendStdout]);

  React.useEffect(() => {
    if (appendStderr) {
      setStderr(prev => prev + appendStderr);
    }
  }, [appendStderr]);

  return (
    <div className={`${styles['code-editor-container']} ${styles[`theme-${theme}`]}`}>
      <div className={styles['toolbar']}>
        {enableRunButton && (
          <button
            type="button"
            className={styles['toolbar-button']}
            onClick={handleRun}
            aria-label="Run code"
            title="Run code"
          >
            <span role="img" aria-label="Run code">▶️</span>
          </button>
        )}
        {(stdout || stderr) && (
          <button
            type="button"
            className={styles['toolbar-button']}
            onClick={clearOutput}
            aria-label="Clear output"
            title="Clear output"
          >
            <span role="img" aria-label="Clear output">🗑️</span>
          </button>
        )}
        <button
          type="button"
          className={styles['toolbar-button']}
          onClick={handleToggleLibraryInfo}
          aria-label="Show library information"
          title="Show library information"
        >
          <span role="img" aria-label="Library information">ℹ️</span>
        </button>

        {showLibraryInfo && (
          <div className={styles['library-info-container']}>
            <div className={styles['library-info-popup']}>
              <h4>Available Python Libraries</h4>
              <div className={styles['library-list']}>
                <div className={styles['library-category']}>
                  <h5>Core Libraries</h5>
                  <ul>
                    <li><strong>base58</strong> (2.1.1) - Base58 encoding/decoding</li>
                    <li><strong>bcrypt</strong> (4.2.1) - Password hashing</li>
                    <li><strong>cffi</strong> (1.17.1) - Foreign function interface</li>
                    <li><strong>cryptography</strong> (44.0.0) - Cryptographic functions</li>
                    <li><strong>mpmath</strong> (1.3.0) - Arbitrary precision math</li>
                  </ul>
                </div>
                <div className={styles['library-category']}>
                  <h5>Data Science</h5>
                  <ul>
                    <li><strong>numpy</strong> (2.2.1) - Numerical computing</li>
                    <li><strong>pandas</strong> (2.2.3) - Data manipulation</li>
                    <li><strong>scipy</strong> (1.14.1) - Scientific computing</li>
                    <li><strong>sympy</strong> (1.13.3) - Symbolic mathematics</li>
                  </ul>
                </div>
                <div className={styles['library-category']}>
                  <h5>Utilities</h5>
                  <ul>
                    <li><strong>requests</strong> - HTTP library</li>
                    <li><strong>python-dateutil</strong> (2.9.0) - Date/time utilities</li>
                    <li><strong>pytz</strong> (2024.2) - Timezone support</li>
                    <li><strong>tzdata</strong> (2024.2) - Timezone data</li>
                  </ul>
                </div>
                <div className={styles['library-category']}>
                  <h5>Search & Text</h5>
                  <ul>
                    <li><strong>whoosh</strong> (2.7.4) - Full-text search</li>
                    <li><strong>xxhash</strong> (3.5.0) - Hash functions</li>
                  </ul>
                </div>
              </div>
              <button
                type="button"
                onClick={handleToggleLibraryInfo}
                className={styles['close-button']}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles['editor-panels-container']}>
        <div className={styles['editor-panel']}>
          <CodeMirror
            value={code}
            height="400px"
            extensions={[python()]}
            theme={theme === 'dark' ? oneDark : undefined}
            onChange={handleCodeChange}
            placeholder="Write your Python code here..."
          />
        </div>

        {/* Output panels */}
        {(stdout || stderr) && (
          <div className={styles['output-panels']}>
            {stdout && (
              <div className={styles['stdout-panel']}>
                <div className={styles['panel-header']}>
                  Output
                  {executionTime && (
                    <span className={styles['execution-time']}>
                      ({executionTime.toFixed(2)}s)
                    </span>
                  )}
                </div>
                <div className={styles['panel-content']}>
                  {stdout}
                </div>
              </div>
            )}
            {stderr && (
              <div className={styles['stderr-panel']}>
                <div className={styles['panel-header']}>
                  Errors
                  {executionTime && (
                    <span className={styles['execution-time']}>
                      ({executionTime.toFixed(2)}s)
                    </span>
                  )}
                </div>
                <div className={styles['panel-content']}>
                  {stderr}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReactCodeEditor;



