import Link from "next/link";
import { db } from "@/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => (
    <div className="col s12 m6 l4" key={snippet.id}>
      <div className="card hoverable">
        <div className="card-content">
          <span className="card-title">{snippet.title}</span>
        </div>
        <div className="card-action">
          <Link href={`/snippets/${snippet.id}`} className="blue-text text-darken-2">
            View
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="row" style={{ alignItems: "center" }}>
        <h1 className="header">Snippets</h1>
      </div>
      <div className="row">
        {renderedSnippets}
      </div>

      <div className="fixed-action-btn">
        <Link href="/snippets/new" className="btn-floating btn-large blue">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
}
