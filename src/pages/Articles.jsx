// You create one Articles component responsible only for displaying articles based 
// on the data it receives as props.

// Your routes for /articles/published and /articles/unpublished each have their own 
// loader that fetches the correct subset of articles (published or unpublished).

// The Articles component just renders whatever data the loader gives it — it’s 
// completely agnostic about which type it is.

// use useParams()

export default function Articles() {
  return (
    <>
      <div>
        Imagine articles here!
      </div>
    </>
  )
};
