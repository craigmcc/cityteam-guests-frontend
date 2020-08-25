import React from "react";

import { ClearButton, SearchButton } from "./buttons";

// props.onChange - Handle (event) for search text changed -
//   event.target.value contains the updated value.
// props.onClick - Handle () for click on search button (or enter key) -
//   latest value should have been stored in state by onChange handler.
// props.placeholder - Optional placeholder text [Search for ...]
// props.value - Initial value (from state)
// props.withClear - include a clear button?  [no]
// props.withSearch - include a search button? [no]
const SearchBar = (props) => {

    const onClear = () => {
        console.log("SearchBar.onClear()");
        props.onChange({target: { value: "" }});
    }

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            props.onClick();
        }
    }

    return (
        <div className="input-group">
            <input
                className="form-control"
                onChange={props.onChange}
                onKeyDown={onKeyDown}
                placeholder=
                    {props.placeholder ? props.placeholder : "Search for ..."}
                type="text"
                value={props.value}
            />
            <div className="input-group-append">
                {props.withClear ? (
                    <ClearButton onClick={onClear}/>
                ) : ( <span /> ) }
                {props.withSearch ? (
                    <SearchButton onClick={props.onClick}/>
                ) : ( <span /> ) }
            </div>
        </div>
    );

}

export default SearchBar;
