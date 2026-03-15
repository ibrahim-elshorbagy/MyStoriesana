import React, { forwardRef, useRef } from "react";
import { router, usePage } from "@inertiajs/react";

export default forwardRef(function SearchBar(
  {
    placeholder,
    defaultValue,
    queryKey = "name",
    routeName,
    icon,
    routeParams = {},
    pageParam = "page",
    className = "",
    ...props
  },
  ref
) {
  const inputRef = useRef(null);
  const { url } = usePage();
  const isDashboard = url.startsWith("/dashboard");

  const handleKeyPress = (e) => {
    if (e.key !== "Enter") return;

    let queryString = {
      ...Object.fromEntries(new URLSearchParams(window.location.search)),
    };

    if (e.target.value) {
      queryString[queryKey] = e.target.value;
    } else {
      delete queryString[queryKey];
    }

    // Reset page when searching
    queryString[pageParam] = 1;

    router.get(route(routeName, routeParams), queryString, {
      preserveState: true,
      replace: true,
    });
  };

  const baseClasses = isDashboard
    ? "block w-full p-2 pl-10 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:border-orange-400 dark:focus:ring-orange-900 transition-all"
    : "block w-full p-2 pl-10 text-sm rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all";

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <i
          className={`fa-solid ${icon || "fa-magnifying-glass"} ${isDashboard ? "text-neutral-400 dark:text-neutral-300" : "text-neutral-500"} `}
        ></i>
      </div>

      <input
        {...props}
        type="text"
        ref={ref || inputRef}
        className={`${baseClasses} ${className}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
});
