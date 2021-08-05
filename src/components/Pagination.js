import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Pagination({ page, prevPage, nextPage, isLastPage }) {
    return (
        <div className="pagination d-flex justify-between">
            <button
                onClick={prevPage}
                data-prev={(page - 1).toString()}
                style={{
                    visibility: page <= 1 ? "hidden" : "",
                }}
            >
                <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{
                        fontSize: "15px",
                        marginRight: "10px",
                    }}
                />
                Page {page - 1}{" "}
            </button>
            <button
                onClick={nextPage}
                data-next={(page + 1).toString()}
                style={{
                    visibility: isLastPage ? "hidden" : "",
                    alignSelf: "flex-end",
                }}
            >
                Page {page + 1}{" "}
                <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{
                        fontSize: "15px",
                        marginLeft: "10px",
                    }}
                />
            </button>
        </div>
    )
}

export default Pagination
