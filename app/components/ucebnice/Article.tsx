//@ts-nocheck
import ArticleTitle from "./ArticleTitle"

const Article = ({ article }) => {
    return (
        <div id={article.id} style={{ fontFamily: 'Roboto', fontSize: '1.125rem' }}>
            <ArticleTitle id={article.id} title={article.title} />
            <h5 className="fst-italic" dangerouslySetInnerHTML={{ __html: article.subtitle }}></h5>
            <p dangerouslySetInnerHTML={{ __html: article.content }}></p>
        </div>
    )
}

export default Article