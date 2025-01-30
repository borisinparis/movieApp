import * as React from "react"
const Play = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3.333 2 9.333 6-9.333 6V2Z"
    />
  </svg>
)
export default Play