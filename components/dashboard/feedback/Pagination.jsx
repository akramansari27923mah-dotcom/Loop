import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationPrevious,
  PaginationItem,
  PaginationNext,
} from "@/components/ui/pagination";

const PaginationPage = ({
  totalPage,
  setPage,
  page,
  hasPreviousPage,
  hasNextPage,
}) => {
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (!hasPreviousPage) return;
                setPage(page - 1);
              }}
              className={`${!hasPreviousPage ? "cursor-not-allowed opacity-40" : "opacity-100"}`}
              href="#"
            />
          </PaginationItem>

          {page === 1 ? (
            <PaginationItem>
              <PaginationLink className={"bg-gray-800"} href="#">
                1
              </PaginationLink>
            </PaginationItem>
          ) : page === 2 ? (
            <PaginationItem>
              <PaginationLink className={"bg-gray-800"} href="#">
                2
              </PaginationLink>
            </PaginationItem>
          ) : page === 3 ? (
            <PaginationItem>
              <PaginationLink className={"bg-gray-800"} href="#">
                3
              </PaginationLink>
            </PaginationItem>
          ) : page === 4 ? (
            <PaginationItem>
              <PaginationLink className={"bg-gray-800"} href="#">
                4
              </PaginationLink>
            </PaginationItem>
          ) : (
            page === 5 && (
              <PaginationItem>
                <PaginationLink className={"bg-gray-800"} href="#">
                  5
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (!hasNextPage) return;
                setPage(page + 1);
              }}
              className={`${!hasNextPage ? "cursor-not-allowed opacity-40" : "opacity-100"}`}
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationPage;
