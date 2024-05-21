import { apiSlice } from "./apiSlice";
const MESSAGES_URL = "/api/messages";

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: `${MESSAGES_URL}`,
        method: "GET",
      }),
    }),
    getMessages: builder.query({
      query: (conversationId) => ({
        url: `${MESSAGES_URL}/i/${conversationId}`,
        method: "GET",
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ conversation_id, content }) => ({
        url: `${MESSAGES_URL}/i`,
        method: "POST",
        body: { conversation_id, content },
      }),
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApiSlice;
