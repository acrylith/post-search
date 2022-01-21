import { useState, useEffect } from "react"

export default function PostsList(props) {
    const [posts, setPosts] = useState([]);
    // eslint-disable-next-line
    const [error, setError] = useState("");
    // eslint-disable-next-line
    const [loaded, setLoaded] = useState(false);

    const [totalCount, setTotalCount] = useState(0)

    useEffect (() => {
        const getPosts = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${props.request}&_page=${props.currentPage}`);
            const data = await res.json();
            const total = res.headers.get('x-total-count');
            setPosts(data);
            setTotalCount(total);
        }
        getPosts();
    }, [props.request, props.currentPage]);

    const pagesCount = Math.ceil(totalCount/10);

    const Pagination = () => {
        let pages = []
        for(let i = 1; i <= pagesCount; i++) {
            pages.push(
                <span
                key={i}
                className={props.currentPage == i ? "post__page-current" : "post__page"}
                onClick={(e) => props.setCurrentPage(e.target.textContent)}
                >
                    {i}
                </span>
            )
        }
        return pages;
    }

    return(
        <div className="posts">
            <div className="post__list">
                <div className="row">
                    {posts ? posts.map((post) => {
                            return(
                                <div className="col-6">
                                    <div className="post__card" key={post.id}>
                                        <h3>{post.title}</h3>
                                        <p>{post.body}</p>
                                    </div>
                                </div>
                            )
                        })
                        :null
                    }
                </div>
            </div>
            <div className="post__pagination">
                <Pagination />
            </div>
        </div>
    )
}