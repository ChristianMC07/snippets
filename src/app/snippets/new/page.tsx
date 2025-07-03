'use client'

import { createSnippet } from '@/actions/actions'
import { useActionState, startTransition } from 'react'
import { useEffect } from 'react'


export default function SnippetCreatePage() {
    const [formState, action] = useActionState(createSnippet, { message: "" })

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        startTransition(() => {
            action(formData)
        })
    }


    useEffect(() => {
        import('materialize-css').then((M) => {
            M.updateTextFields()
        })
    }, [])

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="col s12">
                <h3 className="header">Create a Snippet</h3>

                <div className="row">
                    <div className="input-field col s12">
                        <input id="title" name="title" type="text" className="validate" />
                        <label htmlFor="title">Title</label>
                    </div>

                    <div className="input-field col s12">
                        <textarea id="code" name="code" className="materialize-textarea"></textarea>
                        <label htmlFor="code">Code</label>
                    </div>
                </div>

                {formState.message && (
                    <div className="card-panel red lighten-4 red-text text-darken-4">
                        {formState.message}
                    </div>
                )}

                <button type="submit" className="btn blue">
                    Create
                </button>
            </form>
        </div>
    )
}
