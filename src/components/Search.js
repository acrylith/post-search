import { useState, useEffect } from "react"

export default function Search(props) {
    const [value, setValue] = useState("")
    const [isOpen, setIsOpen] = useState(true)

    const [suggestions, setSuggestions] = useState([]);
    // eslint-disable-next-line
    const [error, setError] = useState("");
    // eslint-disable-next-line
    const [loaded, setLoaded] = useState(false);

    useEffect (() => {
        if(value !== ""){
            fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${value}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setLoaded(true);
                    setSuggestions(result)
                },
    
                (error) => {
                    setLoaded(true);
                    setError(error);
                },
            )
        }
    }, [value]);

    const formatSearch = (input) => {
        const formatedSearch = input.replace(/\s/g, '%20');
        setValue(formatedSearch);
    }

    const itemClickHandler = (e) => {
        setValue(e.target.textContent);
        setIsOpen(false);
    }

    const inputClickHandler = (e) => {
        setIsOpen(true);
    }

    const searchClickHandler = () => {
        props.setRequest(value);
        props.setCurrentPage(1);
        setIsOpen(false);
        setValue("");
        alert(value);
    }

    return(
        <div className="search">
            <div className="search__field">
                <input
                    className="search__input"
                    type="text"
                    onChange={(e) => formatSearch(e.target.value)}
                    onClick={inputClickHandler}
                    value={value}
                />
                <ul className="search__suggestions">
                    {value && isOpen
                        ? suggestions.map((sug) => {
                            return(
                                <li
                                className="search__suggestion"
                                key={sug.id}
                                onClick={itemClickHandler}
                                >
                                    {sug.title}
                                </li>
                                )
                            })
                        :null
                    }
                </ul>
            </div>
            <button
            className="search__confirm"
            onClick={searchClickHandler}
            >
                Search
            </button>
        </div>
    )
}