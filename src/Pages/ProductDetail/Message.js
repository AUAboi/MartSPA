import React from 'react'
import "../../css/message.css"
export default function Message({text,sender,id}) {
  return (
    <div className={`message w-[100%] ${sender===id?"bg-green-600 text-white":"bg-white"} flex flex-wrap`}>
      {text}
    </div>
  )
}
