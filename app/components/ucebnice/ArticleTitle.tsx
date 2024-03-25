//@ts-nocheck

const ArticleTitle = ({ id, title }) => {
    return (
        <div className='d-flex flex-row align-items-center'>
            <a className='fs-1 text-secondary me-2 fw-bold' style={{ textDecoration: 'none' }} href={'#' + id}>#</a>
            <h2 className='fw-semibold' dangerouslySetInnerHTML={{ __html: title }}></h2>
        </div>
    )
}

export default ArticleTitle