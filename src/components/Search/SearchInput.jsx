import React from 'react'

const SearchInput = ({ onSearch }) => {
    // const [input, setInput] = useState("");

    const submitHandler = (value) => {

        onSearch(value);
    }

    return (
        <form onSubmit={submitHandler}>
            <input type="text" placeholder='Search a country......'  onChange={(e) => submitHandler(e.target.value)} />
        </form>
    )
}

export default SearchInput