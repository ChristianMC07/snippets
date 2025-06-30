'use client'
import type { Snippet } from '@prisma/client'
import Editor from '@monaco-editor/react'
import { useState } from 'react'
import * as actions from '@/actions/actions'


interface SnippetEditFormProps {
    snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {

    const [code, setCode] = useState(snippet.code);

    const handleEditorChange = (value: string = "") => {
        setCode(value);
    }

    const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);


    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-xl font-bold">Edit Snippet</h1>
            <h2 className="text-lg font-bold">{snippet.title}</h2>
            <form action={editSnippetAction} className="flex flex-col gap-4">
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

                <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-fit" type="submit">Save</button>
            </form>
        </div>
    )
}