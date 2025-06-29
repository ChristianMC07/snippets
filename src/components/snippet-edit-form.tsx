'use client'
import type { Snippet } from '@prisma/client'
import Editor from '@monaco-editor/react'
import { useState } from 'react'


interface SnippetEditFormProps {
    snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {

    const [code, setCode] = useState(snippet.code);

    const handleEditorChange = (value: string = "") => {
        setCode(value);
    }
    return (
        <div>
            <form>
                <Editor
                    height="50vh"
                    language="javascript"
                    theme="vs-dark"
                    defaultValue={code}
                    options={
                        {
                            minimap: {
                                enabled: false
                            },
                        }
                    }
                    onChange={handleEditorChange}
                />

                <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">Save</button>
            </form>
        </div>
    )
}