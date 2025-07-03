'use client'
import type { Snippet } from '@prisma/client'
import Editor from '@monaco-editor/react'
import { useState } from 'react'
import * as actions from '@/actions/actions'
import Link from 'next/link'

interface SnippetEditFormProps {
    snippet: Snippet
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [code, setCode] = useState(snippet.code)

    const handleEditorChange = (value: string = "") => {
        setCode(value)
    }

    const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code)

    return (
        <div className="container">
            <Link
                href={`/snippets/${snippet.id}`}
                className="btn-flat waves-effect"
                style={{ marginTop: "1rem" }}
            >
                <i className="material-icons left">arrow_back</i>
                Back
            </Link>

            <div className="card" style={{ marginTop: "1rem" }}>
                <div className="card-content">
                    <span className="card-title black-text">Edit Snippet</span>
                    <h5 className="black-text">{snippet.title}</h5>

                    <form action={editSnippetAction}>
                        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                            <Editor
                                height="50vh"
                                language="javascript"
                                theme="vs-dark"
                                defaultValue={code}
                                options={{
                                    minimap: { enabled: false },
                                }}
                                onChange={handleEditorChange}
                            />
                        </div>

                        <button type="submit" className="btn blue lighten-1 waves-effect waves-light">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
