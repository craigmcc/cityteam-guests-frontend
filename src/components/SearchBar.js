import React, { useState } from "react";
import { ClearButton, SearchButton } from "./buttons";

// props.onChange - Optionally handle (searchText) for search text changed
//   [Not forwarded]
// props.onClick - Handle (searchText) for search requested (REQUIRED)
// props.placeholder - Optional placeholder text [Search for ...]
// props.withClear - include a clear button?  [no]
// props.withSearch - include a search button? [no]
const SearchBar = (props) => {

    const forwardChange = props.onChange;
    const forwardClick = props.onClick;

    const [searchText, setSearchText] = useState("");

    const onBlur = e => {
        console.log("SearchBar.onBlur()");
        // TODO - anything else?
    }

    const onChange = e => {
        console.log("SearchBar.onChange(" + e.target.value + ")");
        setSearchText(e.target.value);
        if (forwardChange) {
            console.log("SearchBar.onChange.forward(" + searchText + ")");
            forwardChange(searchText);
        }
    }

    const onClear = () => {
        console.log("SearchBar.onClear()");
        onChange({target: {value: ""}});
    }

    const onClick = () => {
        console.log("SearchBar.onClick(" + searchText + ")");
        if (forwardClick) {
            console.log("SearchBar.onClick.forward(" + searchText + ")");
            forwardClick(searchText);
        } else {
            console.log("ERROR: No onClick handler sent to SearchBar");
        }
    }

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            onClick();
        }
    }

    return (
        <div className="input-group">
            <input
                className="form-control"
                onBlur={onBlur}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder=
                    {props.placeholder ? props.placeholder : "Search for ..."}
                type="text"
                value={searchText}
            />
            <div className="input-group-append">
                {props.withClear ? (
                    <ClearButton onClick={onClear}/>
                ) : ( <span /> ) }
                {props.withSearch ? (
                    <SearchButton onClick={onClick}/>
                ) : ( <span /> ) }
            </div>
        </div>
    );

}

export default SearchBar;
