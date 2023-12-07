import React, { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { codeGenerator } from "../../utils";
import { propTypes } from "prop-types";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, pageCount, switchPage }) => {
  const cn = bem("Pagination");

  let pages = [];
  if (currentPage <= 2) {
    pages = [1, 2, 3, "...", pageCount];
  } else if (currentPage === 3) {
    pages = [1, 2, 3, 4, "...", pageCount];
  } else if (currentPage >= pageCount - 1) {
    pages = [1, "...", pageCount - 2, pageCount - 1, pageCount];
  } else if (currentPage === pageCount - 2) {
    pages = [1, "...", pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
  } else {
    pages = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      pageCount,
    ];
  }

  return (
    <div className={cn()}>
      {pages.map((item, i) =>
     item !== "..." ? (
          <button
            className={`${cn("btn")} ${
              item === currentPage ? cn("btn_active") : ""
            }`}
            onClick={() => switchPage(item)}
            disabled={item === currentPage}
            key={i}
          >
            {item}
          </button>
        ) : (
          <span className={cn("dots")} key={i}>
            {item}
          </span>
        ) 
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pageCount: PropTypes.number,
  switchPage: PropTypes.func,
};

Pagination.defaultProps = {
  switchPage: () => {},
};

export default memo(Pagination);
