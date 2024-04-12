//@ts-nocheck
import ArticleTitle from "./ArticleTitle"

const Article = ({ article }) => {
    return (
        <div id={article.id} style={{ fontFamily: 'Roboto', fontSize: '1.125rem' }}>
            <ArticleTitle id={article.id} title={article.title} subtitle={article.subtitle} />
            <p className="text-learn-4" dangerouslySetInnerHTML={{ __html: article.content }}></p>
        </div>
    )
}

export default Article