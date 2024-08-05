import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

const emailSlice = createApi(
    {
        reducerPath:"emailSlice",
        baseQuery:fetchBaseQuery({ baseUrl:`${BASE_URL}/mail`}),
        endpoints:(builder)=>({
            sendMail : builder.mutation({
                query:(emailData)=>({
                    url:"/sendmail",
                    method:'Post',
                    body:emailData
                })
            })
        })
    }
)

export const { useSendMailMutation } = emailSlice
export default emailSlice