//@ts-nocheck

const ArticleTitle = ({ article }) => {
    return (
        <div className='d-flex flex-row align-items-center'>
            <a className='fs-1 text-secondary me-2 fw-bold' style={{ textDecoration: 'none' }} href={'#' + article.id}>#</a>
            <h2 className='fw-semibold' dangerouslySetInnerHTML={{ __html: article.title }}></h2>
        </div>
    )
}

export default ArticleTitle