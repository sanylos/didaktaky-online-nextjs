//@ts-nocheck

const ArticleTitle = ({ id, title, subtitle }) => {
    return (
        <div className='d-flex flex-row align-items-center justify-content-between'>
            <div className="d-flex flex-row align-items-center col-6">
                <a className='fs-1 text-secondary me-2 fw-bold' style={{ textDecoration: 'none' }} href={'#' + id}>#</a>
                <h2 className='fw-semibold' dangerouslySetInnerHTML={{ __html: title }}></h2>
            </div>
            <h5 className="fst-italic col-6 text-break text-end" dangerouslySetInnerHTML={{ __html: subtitle ? subtitle : "" }}></h5>
        </div>
    )
}

export default ArticleTitle