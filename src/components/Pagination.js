import React from "react";

import { Button } from "./buttons";

// WARNING - This component will likely undergo lots of adaptations!!!!!
// NOTE - This component has no side effects itself, everything is events

// props.currentPage - One relative current page number [1]
// props.lastPage - true if this is the last page, else false [false]
// props.onNext - Handle () for "Next" control being clicked
// props.onPrevious - Handle () for "Previous" control being clicked
const Pagination = (props) => {

    return (
        <>
            <Button
                className="btn btn-outline-secondary btn-sm"
                disabled={props.currentPage === 1}
                label="&lt;"
                onClick={props.onPrevious}
            />
            <Button
                disabled
                label={props.currentPage}
            />
            <Button
                className="btn btn-outline-secondary btn-sm"
                disabled={props.lastPage}
                label="&gt;"
                onClick={props.onNext}
            />
        </>
    )

}

export default Pagination;
