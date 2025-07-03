import { notFound } from "next/navigation";
import { db } from "@/db";
import Link from "next/link";
import * as actions from '@/actions/actions';

interface SnippetShowPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
    const { id } = await props.params;

    const snippet = await db.snippet.findFirst({
        where: { id: parseInt(id) },
    });

    if (!snippet) {
        return notFound();
    }

    const deleteSnippetAction = actions.deleteSnippet.bind(null, parseInt(id));

    return (
        <div className="container">
            <Link href="/" className="btn-flat waves-effect" style={{ marginTop: "1rem" }}>
                <i className="material-icons left">arrow_back</i>
                Back
            </Link>

            <div className="card" style={{ marginTop: "1rem" }}>
                <div className="card-content">
                    <span className="card-title black-text">{snippet.title}</span>

                    <pre
                        style={{
                            backgroundColor: "#263238",
                            color: "#ECEFF1",
                            padding: "1rem",
                            borderRadius: "8px",
                            overflowX: "auto",
                            fontFamily: "Fira Code, Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
                            fontSize: "0.95rem",
                            marginTop: "1rem",
                        }}
                    >
                        <code>{snippet.code}</code>
                    </pre>
                </div>

                <div className="card-action">
                    <Link
                        href={`/snippets/${snippet.id}/edit`}
                        className="btn blue lighten-1 waves-effect waves-light"
                    >
                        Edit
                    </Link>

                    <form action={deleteSnippetAction} style={{ display: "inline" }}>
                        <button
                            type="submit"
                            className="btn red lighten-1 waves-effect waves-light"
                            style={{ marginLeft: "0.5rem" }}
                        >
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();

    return snippets.map((snippet) => {
        return {
            id: snippet.id.toString(),
        };
    });
}
